

import CommonLayout from "@/components/layout/CommonLayout";

export default function HomeLayout({ children }: { children: React.ReactNode }) {

  return (  
    <CommonLayout showPanel={true}>
        {children}
    </CommonLayout>
  );
}
