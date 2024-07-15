class Helpers {
  /*  public validadorPayload = (obj: Record<string, any>, requiredleKeys: string[] = []): boolean => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key]
        if (
          requiredleKeys.includes(key) &&
          (value === null || value === undefined || value === '')
        ) {
          return false
        }
      }
    }
    return true
  } */
  public validadorPayload<T>(
    obj: Partial<T>,
    requiredKeys: (keyof T)[],
    nullableKeys: (keyof T)[] = []
  ): boolean {
    for (const key of requiredKeys) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        return false
      }
      const value = obj[key]
      if (!nullableKeys.includes(key)) {
        if (value === null || value === undefined) {
          return false
        }
        if (typeof value === 'string' && value.trim() === '') {
          return false
        }
      }
    }
    return true
  }
}

export default new Helpers()
