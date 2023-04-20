import '@/styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import { AuthProvider } from '@/providers/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AxiosProvider from '@/providers/axios'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AxiosProvider>
  </AuthProvider>
)

export default App
