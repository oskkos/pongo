import { FinancialRecord, FinancialRecordCategory } from '@prisma/client';
import React, { useState } from 'react';

interface Aggregate {
  EXPENSE: number;
  INCOME: number;
  categories: { [name: string]: { EXPENSE: number; INCOME: number } };
}

export default function FinancialCalculations({
  records,
  categories,
}: {
  records: FinancialRecord[];
  categories: FinancialRecordCategory[];
}) {
  const [visibleCategory, setVisibleCategory] = useState<Map<string, boolean>>(new Map());
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const balance = records.reduce((map, record) => {
    const isoDate = record.recordDate.toISOString();
    const year = isoDate?.substring(0, 4) + '~';
    const yearAndMonth = isoDate?.substring(0, 7);

    const category = categoryMap.get(record.categoryId);
    if (!category) {
      throw new Error('Category not found');
    }

    const initValue = () => ({ EXPENSE: 0, INCOME: 0, categories: {} });
    const categoryInitValue = () => ({ EXPENSE: 0, INCOME: 0 });

    const yearObject: Aggregate = map.get(year) ?? initValue();
    yearObject[category.categoryType] += record.amount;

    const yearCategoryObject = yearObject.categories[category.name] ?? categoryInitValue();
    yearCategoryObject[category.categoryType] += record.amount;
    yearObject.categories[category.name] = yearCategoryObject;
    map.set(year, yearObject);

    const yearAndMonthObject: Aggregate = map.get(yearAndMonth) ?? initValue();
    yearAndMonthObject[category.categoryType] += record.amount;

    const yearAndMonthCategoryObject = yearAndMonthObject.categories[category.name] ?? categoryInitValue();
    yearAndMonthCategoryObject[category.categoryType] += record.amount;
    yearAndMonthObject.categories[category.name] = yearAndMonthCategoryObject;
    map.set(yearAndMonth, yearAndMonthObject);

    return map;
  }, new Map<string, Aggregate>());
  return (
    <main>
      <h1>Financial Calculations</h1>
      <table className="table">
        {Array.from(balance.keys())
          .sort((a, b) => (a < b ? 1 : -1))
          .map((key) => (
            <React.Fragment key={key}>
              <thead
                key={`main${key}`}
                className="cursor-pointer"
                onClick={() => {
                  setVisibleCategory(new Map(visibleCategory.set(key, !visibleCategory.get(key)!)));
                }}
              >
                <tr>
                  <td className="w-7/12">
                    {key.length === 5 ? (
                      <div className="text-2xl">{key.substring(0, 4)}</div>
                    ) : (
                      <div className="text-lg">{key}</div>
                    )}
                  </td>
                  <td className="w-3/12">
                    {balance.get(key)?.EXPENSE !== 0 && (
                      <div className={`w-24 p-3 m-0 badge badge-error`}>
                        {parseInt(String((balance.get(key)?.EXPENSE ?? 0) * 100)) / 100} €
                      </div>
                    )}
                  </td>
                  <td className="w-3/12">
                    {balance.get(key)?.INCOME !== 0 && (
                      <div className={`w-24 p-3 m-0 badge badge-success`}>
                        {parseInt(String((balance.get(key)?.INCOME ?? 0) * 100)) / 100} €
                      </div>
                    )}
                  </td>
                </tr>
              </thead>
              <tbody key={`categories${key}`} className={visibleCategory.get(key) ? '' : 'hidden'}>
                {balance.get(key)!.categories &&
                  Object.entries(balance.get(key)!.categories).map(([category, value]) => (
                    <tr key={category}>
                      <td className="pl-12">{category}</td>
                      <td className="pl-12">
                        {value.EXPENSE !== 0 && (
                          <div className={`w-36 p-3 m-0 badge badge-error badge-outline`}>
                            {parseInt(String((value.EXPENSE ?? 0) * 100)) / 100} €
                          </div>
                        )}
                      </td>
                      <td className="pl-12">
                        {value.INCOME !== 0 && (
                          <div className={`w-36 p-3 m-0 badge badge-success badge-outline`}>
                            {parseInt(String((value.INCOME ?? 0) * 100)) / 100} €
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </React.Fragment>
          ))}
      </table>
    </main>
  );
}
