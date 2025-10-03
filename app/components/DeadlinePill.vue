<template>
  <UBadge
    :color="deadlineColor"
    :variant="deadlineVariant"
    size="sm"
  >
    {{ deadlineText }}
  </UBadge>
</template>

<script setup lang="ts">
interface Props {
  deadline: string
}

const props = defineProps<Props>()

const deadlineInfo = computed(() => {
  const now = new Date()
  const deadline = new Date(props.deadline)
  const diffTime = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      text: 'Closed',
      color: 'red',
      variant: 'solid' as const
    }
  } else if (diffDays === 0) {
    return {
      text: 'Closes today',
      color: 'red',
      variant: 'solid' as const
    }
  } else if (diffDays === 1) {
    return {
      text: 'Closes tomorrow',
      color: 'orange',
      variant: 'solid' as const
    }
  } else if (diffDays <= 7) {
    return {
      text: `${diffDays} days left`,
      color: 'orange',
      variant: 'soft' as const
    }
  } else if (diffDays <= 14) {
    return {
      text: `${diffDays} days left`,
      color: 'yellow',
      variant: 'soft' as const
    }
  } else {
    return {
      text: `${diffDays} days left`,
      color: 'green',
      variant: 'soft' as const
    }
  }
})

const deadlineText = computed(() => deadlineInfo.value.text)
const deadlineColor = computed(() => deadlineInfo.value.color)
const deadlineVariant = computed(() => deadlineInfo.value.variant)
</script>