import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const [userNumber, setUserNumber] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Проверяем, нажимал ли пользователь кнопку
    const clicked = localStorage.getItem('hasClicked');
    const userNum = localStorage.getItem('userNumber');
    const total = localStorage.getItem('totalClicks') || '0';
    
    setHasClicked(clicked === 'true');
    setUserNumber(userNum ? parseInt(userNum) : 0);
    setTotalClicks(parseInt(total));

    // Проверяем тему
    const savedTheme = localStorage.getItem('darkMode');
    setIsDarkMode(savedTheme === 'true');
  }, []);

  useEffect(() => {
    // Применяем тему к документу
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleClick = () => {
    if (!hasClicked) {
      const newTotal = totalClicks + 1;
      setHasClicked(true);
      setUserNumber(newTotal);
      setTotalClicks(newTotal);
      
      localStorage.setItem('hasClicked', 'true');
      localStorage.setItem('userNumber', newTotal.toString());
      localStorage.setItem('totalClicks', newTotal.toString());
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme.toString());
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Переключатель темы */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center gap-3">
          <Icon 
            name="Sun" 
            size={20} 
            className={`transition-colors ${isDarkMode ? 'text-slate-400' : 'text-amber-500'}`} 
          />
          <Switch
            checked={isDarkMode}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-slate-600"
          />
          <Icon 
            name="Moon" 
            size={20} 
            className={`transition-colors ${isDarkMode ? 'text-indigo-300' : 'text-slate-400'}`} 
          />
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-2xl">
          {!hasClicked ? (
            // Экран с кнопкой
            <>
              <h1 className={`text-5xl md:text-7xl font-bold mb-8 transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>
                Нажми
              </h1>
              
              <p className={`text-xl md:text-2xl mb-12 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Каждый может нажать только один раз
              </p>

              <Button
                onClick={handleClick}
                size="lg"
                className="group relative h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-2xl md:text-3xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <Icon name="MousePointer" size={40} className="group-hover:scale-110 transition-transform" />
              </Button>

              {/* Статистика */}
              <div className="mt-16">
                <Card className={`inline-block p-6 transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/80 border-slate-200 backdrop-blur-sm'
                }`}>
                  <div className="flex items-center gap-4">
                    <Icon name="Users" size={24} className={isDarkMode ? 'text-indigo-300' : 'text-blue-500'} />
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Всего нажатий
                      </p>
                      <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {totalClicks}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            // Экран после нажатия
            <>
              <div className="relative">
                <h1 className={`text-4xl md:text-6xl font-bold mb-4 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>
                  Поздравляем!
                </h1>
                
                <div className="absolute -top-8 -right-8 animate-bounce">
                  <Icon name="Sparkles" size={32} className="text-amber-400" />
                </div>
              </div>

              <p className={`text-xl md:text-2xl mb-12 transition-colors ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Вы нажали кнопку!
              </p>

              {/* Карточки с результатами */}
              <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
                <Card className={`p-6 transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/80 border-slate-200 backdrop-blur-sm'
                }`}>
                  <div className="text-center">
                    <Icon name="Trophy" size={32} className="text-amber-500 mx-auto mb-3" />
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
                      Ваш номер
                    </p>
                    <p className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      #{userNumber}
                    </p>
                  </div>
                </Card>

                <Card className={`p-6 transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800/50 border-slate-700 backdrop-blur-sm' 
                    : 'bg-white/80 border-slate-200 backdrop-blur-sm'
                }`}>
                  <div className="text-center">
                    <Icon name="Users" size={32} className={`${isDarkMode ? 'text-indigo-300' : 'text-blue-500'} mx-auto mb-3`} />
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
                      Всего нажатий
                    </p>
                    <p className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {totalClicks}
                    </p>
                  </div>
                </Card>
              </div>

              <div className="mt-8">
                <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  Спасибо за участие! Кнопку можно нажать только один раз.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;