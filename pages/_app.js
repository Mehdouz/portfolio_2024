import Background from "@/components/Background";
import { TransitionProvider } from "@/components/TransitionContext";
import TransitionLayout from "@/components/TransitionLayout";
import "@/styles/globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { WorkProvider } from "@/components/WorkContext";
import WorkLayout from "@/components/WorkLayout";

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Background />
      <WorkProvider>
        <WorkLayout>
          <TransitionProvider>
            <SmoothScroll>
              <TransitionLayout>
                <Component key={router.route} {...pageProps} />
              </TransitionLayout>
            </SmoothScroll>
          </TransitionProvider>
        </WorkLayout>
      </WorkProvider>
    </>
  );
}
