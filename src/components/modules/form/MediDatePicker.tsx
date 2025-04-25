"use client";

import { DatePicker } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label?: string;
  labelClassName?: string;
  picker?: "date" | "month" | "week" | "year";
  inputClassName?: string;
  defaultValue?: Date | string;
};

const MediDatePicker = ({
  name,
  label,
  labelClassName,
  picker = "date",
  inputClassName,
  defaultValue,
}: Props) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      {label && (
        <p
          className={cn(
            "ps-1 mb-2 text-[#101828] dark:text-white text-base font-normal leading-6",
            labelClassName
          )}
        >
          {label}
        </p>
      )}

      <Controller
        control={control}
        name={name}
        rules={{ required: "Expiry date is required" }}
        render={({ field, fieldState }) => (
          <>
            <DatePicker
              {...field}
              picker={picker}
              size="large"
              className={cn("w-full", inputClassName)}
              //   value={field.value ? dayjs(field.value) : null}
              value={
                field.value
                  ? dayjs(field.value)
                  : defaultValue
                  ? dayjs(defaultValue)
                  : null
              }
              onChange={(date) => {
                const iso = date?.toISOString() ?? null;
                field.onChange(iso);
              }}
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
            {fieldState.error && (
              <p className="text-sm text-red-500 mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default MediDatePicker;
