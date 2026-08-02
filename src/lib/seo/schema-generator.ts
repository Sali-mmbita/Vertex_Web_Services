import { clientConfig } from '@/config/client.config';
import { ServiceItem, FAQItem } from '@/types/config';

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PlumbingBusiness',
    'name': clientConfig.meta.name,
    'image': 'https://vortexflow.com/images/logo.png', // Fallback brand image
    'telephon': clientConfig.meta.phoneRaw,
    'email': clientConfig.meta.email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': clientConfig.meta.address.street,
      'addressLocality': clientConfig.meta.address.city,
      'addressRegion': clientConfig.meta.address.state,
      'postalCode': clientConfig.meta.address.zip,
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': clientConfig.meta.address.lat,
      'longitude': clientConfig.meta.address.lng,
    },
    'url': 'https://vortexflow.com',
    'telephone': clientConfig.meta.phone,
    'priceRange': '$$',
    'areaServed': clientConfig.meta.address.zipCodes.map((zip) => ({
      '@type': 'AdministrativeArea',
      'name': zip,
    })),
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': clientConfig.meta.rating,
      'reviewCount': clientConfig.meta.reviewCount,
    },
    'knowsAbout': clientConfig.services.map((s) => s.title),
  };
}

export function getServiceSchema(service: ServiceItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.shortDesc,
    'provider': {
      '@type': 'LocalBusiness',
      'name': clientConfig.meta.name,
      'telephone': clientConfig.meta.phone,
    },
    'offers': {
      '@type': 'Offer',
      'price': service.basePrice,
      'priceCurrency': 'USD',
      'priceRange': service.priceRange,
    },
  };
}

export function getFAQPageSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}
