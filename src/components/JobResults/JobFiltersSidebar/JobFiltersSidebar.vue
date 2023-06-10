<script lang="ts">
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebar",
  components: {
    ActionButton,
    CollapsibleAccordion
  }
};
</script>

<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">O que você quer fazer?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Limpar filtros" type="secondary" />
        </div>
      </div>
      <collapsible-accordion>
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-grow flex-wrap">
              <li class="h-8 w-1/2">
                <input id="VueTube" type="checkbox" class="mr-3" />
                <label for="VueTube" class="select-none">VueTube</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue and Me" type="checkbox" class="mr-3" />
                <label for="Vue and Me" class="select-none">Vue and Me</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue Can Do It" type="checkbox" class="mr-3" />
                <label for="Vue Can Do It" class="select-none">Vue Can Do It</label>
              </li>
              <li class="h-8 w-1/2">
                <input id="Vue and a Half Men" type="checkbox" class="mr-3" />
                <label for="Vue and a Half Men" class="select-none">Vue and a Half Men</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </collapsible-accordion>
    </section>
  </div>
</template>
