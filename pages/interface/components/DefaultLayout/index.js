import { GoToTopButton } from '@tabnews/ui';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';
import { Box, Footer, Header } from '@/TabNewsUI';
import { Head } from 'pages/interface';

export default function DefaultLayout({ children, containerWidth = 'large', metadata }) {
  const router = useRouter();

  const handleKeyPress = useCallback(
    (event) => {
      const isInputField =
        event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable;

      if (!isInputField && event.key === 'r') {
        event.preventDefault();
        router.push('/');
      }
    },
    [router],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'canvas.default' }}>
      {metadata && <Head metadata={metadata} />}
      <Header />
      <Box
        as="main"
        maxWidth={containerWidth}
        sx={{
          marginX: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          padding: [2, null, null, 4],
          paddingTop: [3, null, null, 4],
        }}>
        {children}
      </Box>
      <Footer
        maxWidth={containerWidth}
        sx={{
          marginX: 'auto',
          paddingX: [2, null, null, 4],
          paddingTop: 3,
        }}
      />
      <GoToTopButton target="header" />
    </Box>
  );
}
