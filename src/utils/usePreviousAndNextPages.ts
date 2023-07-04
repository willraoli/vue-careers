import { computed, type WritableComputedRef } from "vue";

export const usePreviousAndNextPages = (
  currentPage: WritableComputedRef<number>,
  maxPage: WritableComputedRef<number>
) => {
  const previousPage = computed(() => {
    const firstPage = 1;
    const previousPage = currentPage.value - 1;
    return previousPage >= firstPage ? previousPage : undefined;
  });

  const nextPage = computed(() => {
    const nextPage = currentPage.value + 1;
    return nextPage <= maxPage.value ? nextPage : undefined;
  });

  return { previousPage, nextPage };
};
