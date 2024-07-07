import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

// Get the preferred locale
export function middleware(request) {
  return i18nRouter(request, i18nConfig);
}


export const config = {
     // Skip all internal paths (_next)
     //Example with some folders: "/((?!api|_next/static|_next/image|all|articles|books).*)",
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};