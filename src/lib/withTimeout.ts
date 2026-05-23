// يلفّ أي وعد بمهلة زمنية. إن تجاوز المدة، يرفض بخطأ مهلة.
export function withTimeout<T>(promise: Promise<T>, ms = 12000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("timeout: تجاوز وقت الاتصال")), ms)
    ),
  ]);
}
