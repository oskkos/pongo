'use client';

import { CldImage, CldImageProps } from 'next-cloudinary';
import { MdHouse } from 'react-icons/md';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Image(props: CldImageProps) {
  try {
    const img = (
      <CldImage
        {...props}
        onError={(e) => {
          console.error(e);
        }}
      />
    );
    return img;
  } catch (error) {
    console.error(error);
    return <MdHouse size={props.width} />;
  }
}
