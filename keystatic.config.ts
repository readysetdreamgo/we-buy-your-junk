import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    project: 'lts-tech/we-buy-your-junk',
  },
  ui: {
    brand: {
      name: 'We Buy Your Junk',
    },
  },
  collections: {
    insights: collection({
      label: 'Insights',
      slugField: 'title',
      path: 'src/content/insights/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'Meta description for SEO (max 160 characters)',
          validation: { length: { max: 160 } },
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({
          label: 'Updated Date',
          description: 'Optional - set when article is updated',
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: 'Mike Thompson',
        }),
        authorRole: fields.text({
          label: 'Author Role',
          defaultValue: 'Owner, We Buy Your Junk LLC',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Market Update', value: 'Market Update' },
            { label: 'How-To', value: 'How-To' },
            { label: 'Industry News', value: 'Industry News' },
            { label: 'Tips & Tricks', value: 'Tips & Tricks' },
            { label: 'Community', value: 'Community' },
          ],
          defaultValue: 'Market Update',
        }),
        readTime: fields.text({
          label: 'Read Time',
          defaultValue: '5 min read',
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/blog',
          publicPath: '/blog/',
        }),
        imageAlt: fields.text({
          label: 'Image Alt Text',
          description: 'Describe the image for accessibility',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'New Tag',
          }
        ),
        featured: fields.checkbox({
          label: 'Featured Article',
          description: 'Show this article in the featured section',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft articles are not published',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Content',
          options: {
            bold: true,
            italic: true,
            strikethrough: true,
            code: true,
            heading: [2, 3, 4],
            blockquote: true,
            orderedList: true,
            unorderedList: true,
            table: true,
            link: true,
            image: true,
            divider: true,
          },
        }),
      },
    }),
    team: collection({
      label: 'Team Members',
      slugField: 'name',
      path: 'src/content/team/*',
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        role: fields.text({ label: 'Role' }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/team',
          publicPath: '/team/',
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'author',
      path: 'src/content/testimonials/*',
      schema: {
        author: fields.slug({ name: { label: 'Author Name' } }),
        company: fields.text({ label: 'Company/Location' }),
        quote: fields.text({
          label: 'Quote',
          multiline: true,
        }),
        rating: fields.integer({
          label: 'Rating (1-5)',
          defaultValue: 5,
          validation: { min: 1, max: 5 },
        }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.text({
          label: 'Answer',
          multiline: true,
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'General', value: 'general' },
            { label: 'Pricing', value: 'pricing' },
            { label: 'Services', value: 'services' },
            { label: 'Junk Cars', value: 'junk-cars' },
            { label: 'Auto Parts', value: 'auto-parts' },
          ],
          defaultValue: 'general',
        }),
        order: fields.integer({
          label: 'Display Order',
          defaultValue: 0,
        }),
      },
    }),
  },
});
