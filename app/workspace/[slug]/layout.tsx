
type Props = {
  params: {
    slug: string;
  };
  children: React.ReactNode;
};

export default async function WorkspaceLayout({ children, params }: Props) {
    

    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}
