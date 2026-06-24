declare module "humanize-duration" {
  interface HumanizeDurationOptions {
    language?: string;
    languages?: Record<string, any>;
    conjunction?: string;
    serialComma?: boolean;
    spacer?: string;
    delimiter?: string;
    largest?: number;
    round?: boolean;
    units?: Array<"y" | "mo" | "w" | "d" | "h" | "m" | "s" | "ms">;
    fallbacks?: string[];
    decimal?: string;
    unitsSeparator?: string;
  }

  function humanizeDuration(
    milliseconds: number,
    options?: HumanizeDurationOptions,
  ): string;
  namespace humanizeDuration {}
  export default humanizeDuration;
}
