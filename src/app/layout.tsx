import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './providers';

export const metadata = {
  title: 'TaskDash',
  description: 'Gerenciador de Tarefas Escolar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}