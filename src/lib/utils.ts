import { clsx, type ClassValue } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapFieldErrorToFormError<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: Record<string, string[] | string>,
) {
  for (const [field, messages] of Object.entries(errors)) {
    if (Array.isArray(messages)) {
      return setError(field as unknown as Path<T>, {
        message: messages.join(", "),
      });
    }

    setError(field as unknown as Path<T>, {
      message: messages,
    });
  }
}
