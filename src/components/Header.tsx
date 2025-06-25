
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Settings, LogOut, Menu, Moon, Sun, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header = ({
  onToggleSidebar
}: HeaderProps) => {
  const {
    user,
    logout,
    isAuthenticated
  } = useAuthStore();
  const navigate = useNavigate();
  const { theme, language, toggleTheme, toggleLanguage, t } = useApp();

  return (
    <header className="h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <Button variant="ghost" size="sm" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 health-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {t('nutriplan')}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Globe className="h-4 w-4" />
          <span className="ml-1 text-sm">{language.toUpperCase()}</span>
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="hidden md:block">{user?.name || 'Usuário'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                {t('settings')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                {t('logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost">{t('login')}</Button>
            <Button className="health-gradient text-white">{t('register')}</Button>
          </div>
        )}
      </div>
    </header>
  );
};
