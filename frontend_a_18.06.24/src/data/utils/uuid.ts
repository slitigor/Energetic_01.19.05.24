export function useUid(arrId: number[]) {
  let uId = 0;
  do {
    uId = Math.floor(Math.random() * 10001);
  } while (arrId.find((id) => id === uId));
  return uId;
}
