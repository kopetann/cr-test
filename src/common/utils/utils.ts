export class Utils {
  public static convertQueryParams(query: Record<string, string>): string {
    return Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
  }
}
