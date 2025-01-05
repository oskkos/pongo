import { FinancialRecord, FinancialRecordCategory } from '@prisma/client';
import React, { useState } from 'react';

interface Apartment {
  id: string;
  streetAddress: string;
}
interface Aggregate {
  EXPENSE: number;
  INCOME: number;
  categories: { [name: string]: { EXPENSE: number; INCOME: number } };
}

function addToMap(
  record: FinancialRecord,
  category: FinancialRecordCategory,
  map: Map<string, Aggregate>,
  timespan: string
) {
  const initValue = () => ({ EXPENSE: 0, INCOME: 0, categories: {} });
  const categoryInitValue = () => ({ EXPENSE: 0, INCOME: 0 });

  const yearObject: Aggregate = map.get(timespan) ?? initValue();
  yearObject[category.categoryType] += record.amount;

  const yearCategoryObject = yearObject.categories[category.name] ?? categoryInitValue();
  yearCategoryObject[category.categoryType] += record.amount;
  yearObject.categories[category.name] = yearCategoryObject;
  map.set(timespan, yearObject);
}

const fontSizeResolver = (key: string, isCategory: boolean) => {
  if (key.length === 5 && !isCategory) {
    return 'text-sm md:text-lg';
  }
  return 'text-xs md:text-sm';
};
function Badge({
  timespan,
  type,
  value,
}: {
  timespan: string;
  type: 'INCOME' | 'EXPENSE';
  value: Aggregate | { EXPENSE: number; INCOME: number } | undefined;
}) {
  const sum = value?.[type];
  if (!sum) {
    return null;
  }
  const badgeType = type === 'EXPENSE' ? 'badge-error' : 'badge-success';
  return (
    <div
      className={`w-24 md:w-32 p-1 md:p-3 m-0 badge ${badgeType} ${fontSizeResolver(timespan, !value.hasOwnProperty('categories'))} ${value.hasOwnProperty('categories') ? '' : 'badge-outline'}`}
    >
      {parseInt(String(sum * 100)) / 100} €
    </div>
  );
}
function CalculationsForApartment({ apartment, balance }: { apartment?: Apartment; balance: Map<string, Aggregate> }) {
  const [visibleCategory, setVisibleCategory] = useState<Map<string, boolean>>(new Map());
  const categoryVisibleResolver = (key: string) => {
    return visibleCategory.get(key) ? '' : 'hidden';
  };

  return (
    <>
      {apartment && <h2 className="mt-4">{apartment.streetAddress}</h2>}
      <table className="table table-sm">
        {Array.from(balance.keys())
          .sort((a, b) => (a < b ? 1 : -1))
          .map((timespan) => (
            <React.Fragment key={timespan}>
              <thead
                className={`cursor-pointer ${fontSizeResolver(timespan, false)}`}
                onClick={() => {
                  setVisibleCategory(new Map(visibleCategory.set(timespan, !visibleCategory.get(timespan)!)));
                }}
              >
                <tr>
                  <td className="w-7/12">
                    {timespan.length === 5 ? (
                      <div>{timespan.substring(0, 4)}</div>
                    ) : (
                      <div className="pl-3">{timespan}</div>
                    )}
                  </td>
                  <td className="w-3/12">
                    <Badge timespan={timespan} type="EXPENSE" value={balance.get(timespan)} />
                  </td>
                  <td className="w-3/12">
                    <Badge timespan={timespan} type="INCOME" value={balance.get(timespan)} />
                  </td>
                </tr>
              </thead>
              <tbody
                className={`cursor-pointer ${fontSizeResolver(timespan, true)} ${categoryVisibleResolver(timespan)}`}
              >
                {balance.get(timespan)!.categories &&
                  Object.entries(balance.get(timespan)!.categories).map(([category, value]) => (
                    <tr key={category}>
                      <td className="pl-12">{category}</td>
                      <td className="pl-12">
                        <Badge timespan={timespan} type="EXPENSE" value={value} />
                      </td>
                      <td className="pl-12">
                        <Badge timespan={timespan} type="INCOME" value={value} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </React.Fragment>
          ))}
      </table>
    </>
  );
}

export default function FinancialCalculations({
  records,
  categories,
  apartments,
}: {
  records: FinancialRecord[];
  categories: FinancialRecordCategory[];
  apartments: Apartment[];
}) {
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const apartmentMap = new Map(apartments.map((apartment) => [apartment.id, apartment]));
  const recordsByApartment = records.reduce((map, record) => {
    map.set(record.apartmentId, (map.get(record.apartmentId) ?? []).concat(record));
    return map;
  }, new Map<string, FinancialRecord[]>());

  const balancesByApartment = Array.from(recordsByApartment.entries()).reduce((map, [apartmentId, records]) => {
    const balance = records.reduce((map, record) => {
      const isoDate = record.recordDate.toISOString();
      const year = isoDate?.substring(0, 4) + '~';
      const yearAndMonth = isoDate?.substring(0, 7);

      const category = categoryMap.get(record.categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      addToMap(record, category, map, year);
      addToMap(record, category, map, yearAndMonth);
      return map;
    }, new Map<string, Aggregate>());
    map.set(apartmentId, balance);
    return map;
  }, new Map<string, Map<string, Aggregate>>());

  return (
    <main>
      <h1>Financial Calculations</h1>
      {Array.from(balancesByApartment.entries()).map(([apartment, balance]) => (
        <CalculationsForApartment key={apartment} apartment={apartmentMap.get(apartment)} balance={balance} />
      ))}
    </main>
  );
}
