<script setup lang="ts">
interface Props {
  type: 'website' | 'cfp' | 'organization' | 'breadcrumb'
  data?: any
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

const structuredData = computed(() => {
  const baseUrl = config.public.siteUrl

  switch (props.type) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Call for Papers',
        url: baseUrl,
        description: 'Discover and track call for papers (CFP) opportunities from conferences, workshops, and meetups worldwide.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }

    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Call for Papers',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'The premier platform for discovering speaking opportunities at tech conferences worldwide.',
        sameAs: []
      }

    case 'cfp':
      if (!props.data) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: props.data.title,
        description: `Call for Papers for ${props.data.title}`,
        startDate: props.data.conference_starts_at || props.data.timeline_opens_at,
        endDate: props.data.conference_ends_at || props.data.timeline_closes_at,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: props.data.platform === 'Online'
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : props.data.platform === 'Hybrid'
          ? 'https://schema.org/MixedEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': props.data.platform === 'Online' ? 'VirtualLocation' : 'Place',
          name: `${props.data.city}, ${props.data.country}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: props.data.city,
            addressCountry: props.data.country
          }
        },
        offers: {
          '@type': 'Offer',
          url: props.data.cfp_url,
          availability: new Date(props.data.closes_at) > new Date()
            ? 'https://schema.org/InStock'
            : 'https://schema.org/SoldOut',
          validFrom: props.data.timeline_opens_at,
          validThrough: props.data.closes_at
        },
        organizer: {
          '@type': 'Organization',
          name: props.data.title,
          url: props.data.website_url
        }
      }

    case 'breadcrumb':
      if (!props.data || !props.data.items) return null
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.path}`
        }))
      }

    default:
      return null
  }
})

useHead({
  script: structuredData.value ? [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value)
    }
  ] : []
})
</script>

<template>
  <div />
</template>
