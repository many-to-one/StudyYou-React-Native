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
    const [Logout_, setLogout] = useState('')
    const [Changepassword_, setChangepassword] = useState('')
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


    const setLanguage = async() => {
        let lng = await AsyncStorage.getItem('language')
        if(lng === 'PL'){
            setHours('Godziny')
            setMinutes('Minuty')
            setVisits('Odwiedziny')
            setPublications('Publikacje')
            setFilms('Filmy')
            setMenu('Menu')
            setEvents('Wydarzenia')
            setProfile('Profil')
            setTimer('Tajmer')
            setResult('Wynik')
            setHistory('Historia')
            setAddEvent('Nowe Wydarzenia')
            setUpdateEvent('Edytuj wydarzenie')
            setAllEvents('Wszystkie wydarzenia')
            setLogin('Logowanie')
            setLogout('Wyłoguj')
            setChangepassword('Zmienić hasło')
            setDaynames(['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Niedz'])
            setMonthnames(['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień  '])
            setTechnicalSupport('Obsługa Techniczna')
            setMinistryLeaders('Zbiórki')
            setMinistryLeader('Zbiórka')
            setMidweekMeetings('Spotkania w środku tygodnia')
            setWeekendMeetings('Spotkania na koniec tygodnia')
            setLeaderAndIntroductoryRemarks('Prowadzący i uwagi wstępne')
            setFirstPrayer('Początkowa modlitwa')
            setTreasuresFromGodsWord('Skarby ze słowa Bożego')
            setSpiritualGems('Duchowe Skarby')
            setBibleReading('Czytanie Biblii')
            setSchoolLeader('Prowadzący szkoły')
            setInitialCall('Pierwsza rozmowa')
            setReturnVisit('Odwiedziny')
            setSchoolStudy('Studium Biblii w szkole')
            setSchoolTalk('Przemówienie')
            setDiscussion('Omówienie z udziałem obecnych')
            setLocalNeeds('Potrzeby zboru')
            setBibleStudyLeader('Zborowy studium Biblii')
            setBibleStudyLector('Zborowy studium Biblii (Lektor)')
            setLastPrayer('Modlitwa końcowa')
            setWeekendLeader('Prowadzący i modlitwa poczatkowa')
            setWeekendSpeach('Przemówienie i modlitwa końcowa')
            setWatchTowerLeader('Prowadzący strażnicy')
            setWatchTowerLector('Strażnica (Lektor)')
            setRegistration('Rejestracja')
            setRequestResetMail('Zresetować hasło')
            setCreateCalendarEvent('Grafik spotkań')
            setMicrophones('Mikrofony')
            setMusic('Nagłośnienie')
            setDuty('Porządkowy')
            setMinistryWith('Służba')
            setPROFILE('PROFIL')
            setTIMER('TAJMER')
            setEVENTS('WYDARZENIA')
            setRESULT('WYNIK')
            setHISTORY('HISTORIA')
            setWith('z')
            setTime('Czas')



        }else if(lng === 'RU'){
            setHours('Часы')
            setMinutes('Минуты')
            setVisits('Повторы')
            setPublications('Публикации')
            setFilms('Фильмы')
            setMenu('Меню')
            setEvents('События')
            setProfile('Профиль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('История')
            setAddEvent('Новое событие')
            setUpdateEvent('Редактировать событие')
            setAllEvents('Все события')
            setLogin('Авторизация')
            setLogout('Выйти')
            setChangepassword('Изменить пароль')
            setTechnicalSupport('Техническая поддержка')
            setMinistryLeaders('Проповедническое служение')
            setMinistryLeader('Встреча пр.служения')
            setMidweekMeetings('Встречи в середине недели')
            setWeekendMeetings('Встречи конца недели')
            setLeaderAndIntroductoryRemarks('Ведущий и вступление')
            setFirstPrayer('Первая молитва')
            setTreasuresFromGodsWord('Сокровища из Божьего слова')
            setSpiritualGems('Духовные жемчужины')
            setBibleReading('Чтение Библии')
            setSchoolLeader('Ведущий школи')
            setInitialCall('Первое посещение')
            setReturnVisit('Повторное посещение')
            setSchoolStudy('Изучение Библии в школе')
            setSchoolTalk('Речь')
            setDiscussion('Обсуждение с участием присутствующих')
            setLocalNeeds('Потребности собрания')
            setBibleStudyLeader('Изучение Библии в собрании')
            setBibleStudyLector('Изучение Библии в собрании (Лектор)')
            setLastPrayer('Заключительная молитва')
            setWeekendLeader('Ведущий и вступительная молитва')
            setWeekendSpeach('Речь и заключительная молитва')
            setWatchTowerLeader('Ведущий Сторожевой Башни')
            setWatchTowerLector('Сторожевая Башня (Лектор)')
            setRegistration('Регистрация')
            setRequestResetMail('Сбросить пароль')
            setCreateCalendarEvent('Расписание встреч')
            setMicrophones('Mикрофоны')
            setMusic('Музыка')
            setDuty('Дежурный')
            setMinistryWith('Служение')
            setPROFILE('ПРОФИЛЬ')
            setTIMER('ТАЙМЕР')
            setEVENTS('СОБЫТИЯ')
            setRESULT('РЕЗУЛЬТАТ')
            setHISTORY('ИСТОРИЯ')
            setWith('c')
            setTime('Время')

        }else if(lng === 'UA'){
            setHours('Години')
            setMinutes('Хвилини')
            setVisits('Повтори')
            setPublications('Публiкацiї')
            setFilms('Фiльми')
            setMenu('Меню')
            setEvents('Подiї')
            setProfile('Профiль')
            setTimer('Таймер')
            setResult('Результат')
            setHistory('Iсторiя')
            setAddEvent('Нова подiя')
            setUpdateEvent('Редагувати подiю')
            setAllEvents('Усi подiї')
            setLogin('Авторизація')
            setLogout('Вийти')
            setChangepassword('Змiнити гасло')
            setTechnicalSupport('Технічна підтримка')
            setMinistryLeaders('Проповідницьке служіння')
            setMinistryLeader('Проп. служіння')
            setMidweekMeetings('Зустрічі у середині тижня')
            setWeekendMeetings('Зустрічі кінця тижня')
            setLeaderAndIntroductoryRemarks('Ведучий і вступ')
            setFirstPrayer('Початкова молитва')
            setTreasuresFromGodsWord('Скарби з Божого слова')
            setSpiritualGems('Духовнi перлини')
            setBibleReading('Читання Біблії')
            setSchoolLeader('Ведучий школи')
            setInitialCall('Перша розмова')
            setInitialCall('Повторне відвідування')
            setSchoolStudy('Вивчення Біблії у школі')
            setSchoolTalk('Виступ')
            setDiscussion('Обговорення за участю присутніх')
            setLocalNeeds('Потреби збору')
            setBibleStudyLeader('Вивчення Біблії в зборі')
            setBibleStudyLector('Вивчення Біблії в зборі (Лектор)')
            setLastPrayer('Заключна молитва')
            setWeekendLeader('Ведучий і вступна молитва')
            setWeekendSpeach('Промова та заключна молитва')
            setWatchTowerLeader('Ведучий Вартової Башти')
            setWatchTowerLector('Вартова Башта (Лектор)')
            setRegistration('Реєстрація')
            setRequestResetMail('Ануляцiя паролю')
            setCreateCalendarEvent('Розклад зустрічей')
            setMicrophones('Mікрофони')
            setMusic('Музика')
            setDuty('Черговий')
            setMinistryWith('Служіння')
            setPROFILE('ПРОФІЛЬ')
            setTIMER('ТАЙМЕР')
            setEVENTS('ПОДІЇ')
            setRESULT('РЕЗУЛЬТАТ')
            setHISTORY('ІСТОРІЯ')
            setWith('з')
            setTime('Час')

        }
      };

      return(
   
        <LanguageContext.Provider value={{
            setLanguage,
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
        }}>
            {children}
        </LanguageContext.Provider>
    )


}