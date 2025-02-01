import Head from "next/head"

interface SchemaProps {
  schema: object
}

export function Schema({ schema }: SchemaProps) {
  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </Head>
  )
}

