import { FilterSelect } from '@/app/(marketplace)/shopping/components/filterSection/FilterSelect';
import { PROVINCE_OPTIONS } from '@/constants';
export const LocationFilter = ({
  activeProvince,
  activeCity,
  availableCityOptions,
  handleProvinceChange,
  handleCityChange,
}: {
  activeProvince: string;
  activeCity: string;
  availableCityOptions: { value: string; label: string }[];
  handleProvinceChange: (province: string) => void;
  handleCityChange: (city: string) => void;
}) => {
  return (
    <div>
      <h5 className="mb-4 text-lg">지역</h5>
      <div className="flex flex-col gap-2">
        <FilterSelect
          name="province"
          value={activeProvince}
          options={PROVINCE_OPTIONS}
          className="w-full"
          onChange={(province) => handleProvinceChange(province)}
        />
        <FilterSelect
          name="city"
          value={activeCity}
          options={availableCityOptions}
          className="w-full"
          onChange={(city) => handleCityChange(city)}
        />
      </div>
    </div>
  );
};
