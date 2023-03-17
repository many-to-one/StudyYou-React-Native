import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {

    const [Hours, setHours] = useState('')
    const [Minutes, setMinutes] = useState('')
    const [Visits, setVisits] = useState('')
    const [Publications, setPublications] = useState('')
    const [Films, setFilms] = useState('')
    const [Menu_, setMenu] = useState('')
    const [Events_, setEvents] = useState('')
    const [Profile_, setProfile] = useState('')
    const [Timer_, setTimer] = useState('')
    const [Result_, setResult] = useState('')
    const [History_, setHistory] = useState('')
    const [AddEvent_, setAddEvent] = useState('')
    const [UpdateEvent_, setUpdateEvent] = useState('')
    const [AllEvents_, setAllEvents] = useState('')
    const [dayNames, setDaynames] = useState([])
    const [monthNames, setMonthnames] = useState([])
    const [technicalSupport_, setTechnicalSupport] = useState([])
    const [ministryLeaders_, setMinistryLeaders] = useState([])
    const [ministryLeader_, setMinistryLeader] = useState([])
    const [midweekMeetings_, setMidweekMeetings] = useState([])
    const [weekendMeetings_, setWeekendMeetings] = useState([])
    const [leaderAndIntroductoryRemarks_, setLeaderAndIntroductoryRemarks] = useState([])
    const [firstPrayer_, setFirstPrayer] = useState([])
    const [treasuresFromGodsWord_, setTreasuresFromGodsWord] = useState([])
    const [spiritualGems_, setSpiritualGems] = useState([])
    const [bibleReading_, setBibleReading] = useState([])
    const [schoolLeader_, setSchoolLeader] = useState([])
    const [initialCall_, setInitialCall] = useState([])
    const [returnVisit_, setReturnVisit] = useState([])
    const [schoolStudy_, setSchoolStudy] = useState([])
    const [schoolTalk_, setSchoolTalk] = useState([])
    const [discussion_, setDiscussion] = useState([])
    const [localNeeds_, setLocalNeeds] = useState([])
    const [bibleStudyLeader_, setBibleStudyLeader] = useState([])
    const [bibleStudyLector_, setBibleStudyLector] = useState([])
    const [lastPrayer_, setLastPrayer] = useState([])
    const [weekendLeader_, setWeekendLeader] = useState([])
    const [weekendSpeach_, setWeekendSpeach] = useState([])
    const [watchTowerLeader_, setWatchTowerLeader] = useState([])
    const [watchTowerLector_, setWatchTowerLector] = useState([])
    const [login_, setLogin] = useState([])
    const [registration_, setRegistration] = useState([])
    const [Logout_, setLogout] = useState('')
    const [Changepassword_, setChangepassword] = useState('')
    const [forgotPassword_, setForgotPassword] = useState('')
    const [dhaccount_, setDhaccount] = useState('')
    const [submit_, setSubmit] = useState('')
    const [click_, setClick] = useState('')
    const [requestResetMail_, setRequestResetMail] = useState([])
    const [createCalendarEvent_, setCreateCalendarEvent] = useState([])
    const [microphones_, setMicrophones] = useState([])
    const [music_, setMusic] = useState([])
    const [duty_, setDuty] = useState([])
    const [ministryWith_, setMinistryWith] = useState([])
    const [PROFILE_, setPROFILE] = useState([])
    const [TIMER_, setTIMER] = useState([])
    const [EVENTS_, setEVENTS] = useState([])
    const [RESULT_, setRESULT] = useState([])
    const [HISTORY_, setHISTORY] = useState([])
    const [with_, setWith] = useState([])
    const [time_, setTime] = useState([])
    const [delHistory_, setDelHistory] = useState([])
    const [yes_, setYes] = useState([])
    const [no_, setNo] = useState([]) 
    const [trans, setTrans] = useState({})


    const setLanguage = async() => {
        let lng = await AsyncStorage.getItem('language')
        if(lng === 'PL'){
            setTrans({
                'Hours': 'Godziny',
                'Minutes': 'Minuty',
                'Visits': 'Odwiedziny',
                'Publications': 'Publikacje',
                'Films': 'Filmy',
                'Menu': 'Menu',
                'Events': 'Wydarzenia',
                'Profile': 'Profil',
                'Timer': 'Timer',
                'Result': 'Wynik',
                'History': 'Historia',
                'AddEvent': 'Nowe Wydarzenia',
                'UpdateEvent': 'Edytuj wydarzenie',
                'AllEvents': 'Wszystkie wydarzenia',
                'Login': 'Logowanie',
                'Logout': 'Wyłoguj',
                'Changepassword': 'Zmienić hasło',
                'TechnicalSupport': 'Obsługa Techniczna',
                'MinistryLeaders': 'Zbiórki',
                'MinistryLeader': 'Zbiórka',
                'MidweekMeetings': 'Spotkania w środku tygodnia', 
                'WeekendMeetings': 'Spotkania na koniec tygodnia',
                'LeaderAndIntroductoryRemarks': 'Prowadzący i uwagi wstępne',
                'FirstPrayer': 'Początkowa modlitwa',
                'TreasuresFromGodsWord': 'Skarby ze słowa Bożego',
                'SpiritualGems': 'Duchowe Skarby',
                'BibleReading': 'Czytanie Biblii',
                'SchoolLeader' : 'Prowadzący szkoły',
                'InitialCall' : 'Pierwsza rozmowa',
                'ReturnVisit' : 'Odwiedziny',
                'SchoolStudy' : 'Studium Biblii w szkole',
                'SchoolTalk' : 'Przemówienie',
                'Discussion' : 'Omówienie z udziałem obecnych',
                'LocalNeeds' : 'Potrzeby zboru',
                'BibleStudyLeader' : 'Zborowy studium Biblii',
                'BibleStudyLector' : 'Zborowy studium Biblii (Lektor)',
                'LastPrayer' : 'Modlitwa końcowa',
                'WeekendLeader' : 'Prowadzący i modlitwa poczatkowa',
                'WeekendSpeach' : 'Przemówienie i modlitwa końcowa',
                'WatchTowerLeader' : 'Prowadzący strażnicy',
                'WatchTowerLector' : 'Strażnica (Lektor)',
                'Registration' : 'Rejestracja',
                'RequestResetMail' :'Zresetować hasło',
                'CreateCalendarEvent' : 'Grafik spotkań',
                'Microphones' : 'Mikrofony',
                'Music' : 'Nagłośnienie',
                'Duty' : 'Porządkowy',
                'MinistryWith' : 'Służba',
                'PROFILE' : 'PROFIL',
                'TIMER' : 'TIMER',
                'EVENTS' : 'WYDARZENIA',
                'RESULT' : 'WYNIK',
                'HISTORY' : 'HISTORIA',
                'With' : 'z',
                'Time' : 'Czas',
                'DelHistory' : 'Po usunięciu dane za ten miesiąc zostaną całkowicie stracone, usunąć?',
                'No' : 'Nie',
                'Yes' : 'Tak',
                'ForgotPassword' : 'Nie Pamiętam hasła',
                'Dhaccount' : 'Załóż konto',
                'Submit' : 'Potwierdzić',
                'Click' : 'Kliknij tutaj',
                'Rest' : 'Pozostało',
                'Groupe': 'Grupa',
                'Cleaning': 'Sprzątanie',
                'Stand': 'Głoszenie z wózkiem',
                'Speaker': 'Mówca (gość)',
                'Topic': 'Temat',
                'PioneerStandard': 'Norma pioniera pełnoczasowego',
                'OverallScore': 'Wynik ogólny',
                'BibleStudies': 'Studia Biblijne',
            })
            setDaynames(['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'])
            setMonthnames([
                'styczeń', 
                'luty', 
                'marzec', 
                'kwiecień', 
                'maj', 
                'czerwiec', 
                'lipiec', 
                'sierpień', 
                'wrzesień', 
                'październik', 
                'listopad', 
                'grudzień'
            ])

        }else if(lng === 'RU'){
            setTrans({
                'Hours': 'Часы',
                'Minutes': 'Минуты',
                'Visits': 'Повторы',
                'Publications': 'Публикации',
                'Films': 'Фильмы',
                'Menu': 'Меню',
                'Events': 'События',
                'Profile': 'Профиль',
                'Timer': 'Таймер',
                'Result': 'Результат',
                'History': 'История',
                'AddEvent': 'Новое событие',
                'UpdateEvent': 'Редактировать событие',
                'AllEvents': 'Все события',
                'Login': 'Авторизация',
                'Logout': 'Выйти',
                'Changepassword': 'Изменить пароль',
                'TechnicalSupport': 'Техническая поддержка',
                'MinistryLeaders': 'Проповедническое служение',
                'MinistryLeader': 'Встреча пр.служения',
                'MidweekMeetings': 'Встречи в середине недели', 
                'WeekendMeetings': 'Встречи конца недели',
                'LeaderAndIntroductoryRemarks': 'Ведущий и вступление',
                'FirstPrayer': 'Первая молитва',
                'TreasuresFromGodsWord': 'Сокровища из Божьего слова',
                'SpiritualGems': 'Духовные жемчужины',
                'BibleReading': 'Чтение Библии',
                'SchoolLeader' : 'Ведущий школи',
                'InitialCall' : 'Первое посещение',
                'ReturnVisit' : 'Повторное посещение',
                'SchoolStudy' : 'Изучение Библии в школе',
                'SchoolTalk' : 'Речь',
                'Discussion' : 'Обсуждение с участием присутствующих',
                'LocalNeeds' : 'Потребности собрания',
                'BibleStudyLeader' : 'Изучение Библии в собрании',
                'BibleStudyLector' : 'Изучение Библии в собрании (Лектор)',
                'LastPrayer' : 'Заключительная молитва',
                'WeekendLeader' : 'Ведущий и вступительная молитва',
                'WeekendSpeach' : 'Речь и заключительная молитва',
                'WatchTowerLeader' : 'Ведущий Сторожевой Башни',
                'WatchTowerLector' : 'Сторожевая Башня (Лектор)',
                'Registration' : 'Регистрация',
                'RequestResetMail' :'Сбросить пароль',
                'CreateCalendarEvent' : 'Расписание встреч',
                'Microphones' : 'Mикрофоны',
                'Music' : 'Музыка',
                'Duty' : 'Распорядитель',
                'MinistryWith' : 'Служение',
                'PROFILE' : 'ПРОФИЛЬ',
                'TIMER' : 'ТАЙМЕР',
                'EVENTS' : 'СОБЫТИЯ',
                'RESULT' : 'РЕЗУЛЬТАТ',
                'HISTORY' : 'ИСТОРИЯ',
                'With' : 'c',
                'Time' : 'Время',
                'DelHistory' : 'Данные за текущий месяц будут полностью утрачены, удалить?',
                'No' : 'Нет',
                'Yes' : 'Да',
                'ForgotPassword' : 'Не помню пароль',
                'Dhaccount' : 'Ещё не зарегистрированы?',
                'Submit' : 'Подтвердить',
                'Click' : 'Нажмите здесь',
                'Rest' : 'Осталось',
                'Groupe': 'Группа',
                'Cleaning': 'Уборка',
                'Stand' : 'Служение со стендом',
                'Speaker': 'Оратор (гость)',
                'Topic': 'Тема',
                'PioneerStandard': 'Норма полновременного пионера',
                'OverallScore': 'Общий результат',
                'BibleStudies': 'Изучения Библии',
            })
            setDaynames(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'])
            setMonthnames([
                'Январь', 
                'Февраль', 
                'Март', 'Апрель', 
                'Май', 
                'Июнь', 
                'Июль', 
                'Август', 
                'Сентябрь', 
                'Октябрь', 
                'Ноябрь', 
                'Декабрь'
            ])

        }else if(lng === 'UA'){
            setTrans({
                'Hours': 'Години',
                'Minutes': 'Минуты',
                'Visits': 'Повтори',
                'Publications': 'Публiкацiї',
                'Films': 'Фiльми',
                'Menu': 'Меню',
                'Events': 'Подiї',
                'Profile': 'Профiль',
                'Timer': 'Таймер',
                'Result': 'Результат',
                'History': 'Iсторiя',
                'AddEvent': 'Нова подiя',
                'UpdateEvent': 'Редагувати подiю',
                'AllEvents': 'Усi подiї',
                'Login': 'Авторизація',
                'Logout': 'Вийти',
                'Changepassword': 'Змiнити пароль',
                'TechnicalSupport': 'Технічна підтримка',
                'MinistryLeaders': 'Проповідницьке служіння',
                'MinistryLeader': 'Проп. служіння',
                'MidweekMeetings': 'Зустрічі у середині тижня', 
                'WeekendMeetings': 'Зустрічі кінця тижня',
                'LeaderAndIntroductoryRemarks': 'Ведучий і вступ',
                'FirstPrayer': 'Початкова молитва',
                'TreasuresFromGodsWord': 'Скарби з Божого слова',
                'SpiritualGems': 'Духовнi перлини',
                'BibleReading': 'Читання Біблії',
                'SchoolLeader' : 'Ведучий школи',
                'InitialCall' : 'Перша розмова',
                'ReturnVisit' : 'Повторне відвідування',
                'SchoolStudy' : 'Вивчення Біблії у школі',
                'SchoolTalk' : 'Виступ',
                'Discussion' : 'Обговорення за участю присутніх',
                'LocalNeeds' : 'Потреби збору',
                'BibleStudyLeader' : 'Вивчення Біблії в зборі',
                'BibleStudyLector' : 'Вивчення Біблії в зборі (Лектор)',
                'LastPrayer' : 'Заключна молитва',
                'WeekendLeader' : 'Ведучий і вступна молитва',
                'WeekendSpeach' : 'Промова та заключна молитва',
                'WatchTowerLeader' : 'Ведучий Вартової Башти',
                'WatchTowerLector' : 'Вартова Башта (Лектор)',
                'Registration' : 'Реєстрація',
                'RequestResetMail' :'Ануляцiя паролю',
                'CreateCalendarEvent' : 'Розклад зустрічей',
                'Microphones' : 'Mікрофони',
                'Music' : 'Музика',
                'Duty' : 'Черговий',
                'MinistryWith' : 'Служіння',
                'PROFILE' : 'ПРОФІЛЬ',
                'TIMER' : 'ТАЙМЕР',
                'EVENTS' : 'ПОДІЇ',
                'RESULT' : 'РЕЗУЛЬТАТ',
                'HISTORY' : 'ІСТОРІЯ',
                'With' : 'з',
                'Time' : 'Час',
                'DelHistory' : 'Дані за цей місяць будуть повністю видалені, видалити?',
                'No' : 'Hі',
                'Yes' : 'Так',
                'ForgotPassword' : "Hе пам'ятаю пароль",
                'Dhaccount' : 'Ще не зареєстровані?',
                'Submit' : 'Підтвердити',
                'Click' : 'Натиснути тут',
                'Rest' : 'Залишилось',
                'Groupe': 'Група',
                'Cleaning': 'Прибирання',
                'Stand' : 'Служіння зі стендом',
                'Speaker': 'Спікер (гість)',
                'Topic': 'Тема',
                'PioneerStandard': 'Норма повночасного піонера',
                'OverallScore': 'Загальний результат',
                'BibleStudies': 'Bивчення Біблії',
            })
            setDaynames(['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'])
            setMonthnames([
                'січень ', 
                'лютий ', 
                'березень ', 
                'квітень ', 
                'травень ', 
                'червень ', 
                'липень ', 
                'серпень ', 
                'вересень ', 
                'жовтень ', 
                'листопад ', 
                'грудень'
            ])
        }
      };

      return(
   
        <LanguageContext.Provider value={{
            setLanguage,
            forgotPassword_,
            dhaccount_,
            submit_,
            click_,
            Hours,
            Minutes,
            Visits,
            Publications,
            Films,
            Menu_,
            Events_,
            Profile_,
            Timer_,
            Result_,
            History_,
            AddEvent_,
            UpdateEvent_,
            AllEvents_,
            Logout_,
            login_,
            registration_,
            requestResetMail_,
            Changepassword_,
            dayNames,
            monthNames,
            technicalSupport_,
            ministryLeaders_,
            ministryLeader_,
            midweekMeetings_,
            weekendMeetings_,
            leaderAndIntroductoryRemarks_,
            firstPrayer_,
            treasuresFromGodsWord_,
            spiritualGems_,
            bibleReading_,
            schoolLeader_,
            initialCall_,
            returnVisit_,
            schoolStudy_,
            schoolTalk_,
            discussion_,
            localNeeds_,
            bibleStudyLeader_,
            bibleStudyLector_,
            lastPrayer_,
            weekendLeader_,
            weekendSpeach_,
            watchTowerLeader_,
            watchTowerLector_,
            createCalendarEvent_,
            microphones_,
            music_,
            ministryWith_,
            duty_,
            PROFILE_,
            TIMER_,
            EVENTS_,
            RESULT_,
            HISTORY_,
            with_,
            time_,
            delHistory_,
            no_,
            yes_,
            trans,
        }}>
            {children}
        </LanguageContext.Provider>
    )


}