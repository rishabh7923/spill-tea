import { useTheme } from "./ThemeProvider";

import {
  Field,
  FieldContent,
  FieldLabel,
} from "@/components/ui/field";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      value={theme}
      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
      className="w-fit"
    >
      <Field orientation="horizontal">
        <RadioGroupItem value="system" id="theme-system" />
        <FieldContent>
          <FieldLabel htmlFor="theme-system">System</FieldLabel>
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <RadioGroupItem value="dark" id="theme-dark" />
        <FieldContent>
          <FieldLabel htmlFor="theme-dark">Dark</FieldLabel>
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <RadioGroupItem value="light" id="theme-light" />
        <FieldContent>
          <FieldLabel htmlFor="theme-light">Light</FieldLabel>
        </FieldContent>
      </Field>
    </RadioGroup>
  );
}