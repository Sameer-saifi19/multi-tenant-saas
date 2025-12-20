type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export default async function WorkspaceLayout({ params, children }: Props) {

  const slug = params.slug;

  console.log(slug)

  return (
    <>
        {children}
    </>
  )
}
