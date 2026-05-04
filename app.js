    function showBootError(message) {
      const authStatusEl = document.getElementById('authStatus');
      if (!authStatusEl) return;
      authStatusEl.textContent = message;
      authStatusEl.classList.add('show', 'warning');
      authStatusEl.classList.remove('error');
    }

    window.loginNow = function () {
      showBootError('Síðan er enn að hlaðast eða rakst á villu. Endurhlaðaðu síðuna og reyndu aftur.');
    };

    window.bookNow = function () {
      const bookingStatusEl = document.getElementById('bookingStatus');
      if (!bookingStatusEl) return;
      bookingStatusEl.textContent = 'Síðan er enn að hlaðast eða rakst á villu. Endurhlaðaðu síðuna og reyndu aftur.';
      bookingStatusEl.classList.add('show', 'warning');
      bookingStatusEl.classList.remove('error');
    };

    window.addEventListener('error', (event) => {
      const message = event?.error?.message || event.message || 'Óvænt villa kom upp við að hlaða síðunni.';
      showBootError(message);
    });

    window.addEventListener('unhandledrejection', (event) => {
      const message = event?.reason?.message || 'Óvænt villa kom upp í bakgrunni.';
      showBootError(message);
    });

    if (!window.flatpickr) {
      showBootError('Dagatalið náði ekki að hlaðast. Athugaðu nettengingu og reyndu aftur.');
      console.error('flatpickr failed to load');
    } else if (!window.supabase || !window.supabase.createClient) {
      showBootError('Supabase náði ekki að hlaðast. Athugaðu nettengingu og reyndu aftur.');
      console.error('supabase-js failed to load');
    } else {
      initializePage();
    }

    function initializePage() {
      const SUPABASE_URL = 'https://fabkvblawbavbmozlutj.supabase.co';
      const SUPABASE_KEY = 'sb_publishable_eC_30Wnq3C9B7lM46mfGkw_7rNcV-aG';
      const WEATHER_LOCATION = {
        label: 'Munaðarnes',
        lat: 64.70242,
        lon: -21.62151
      };
      const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

      const loginEmailInput = document.getElementById('loginEmail');
      const loginPasswordInput = document.getElementById('loginPassword');
      const signupEmailInput = document.getElementById('signupEmail');
      const signupPasswordInput = document.getElementById('signupPassword');
      const signupNameInput = document.getElementById('signupName');
      const forgotPasswordEmailInput = document.getElementById('forgotPasswordEmail');
      const profileDisplayNameInput = document.getElementById('profileDisplayName');
      const profileColorChoicesEl = document.getElementById('profileColorChoices');
      const newPasswordInput = document.getElementById('newPassword');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      const fullNameInput = document.getElementById('fullName');
      const dateRangeInput = document.getElementById('dateRange');
      const taskTitleInput = document.getElementById('taskTitle');
      const taskCategoryInput = document.getElementById('taskCategory');
      const taskAssigneeInput = document.getElementById('taskAssignee');
      const taskStatusSelect = document.getElementById('taskStatusSelect');
      const taskNotesInput = document.getElementById('taskNotes');
      const taskForm = document.getElementById('taskForm');
      const taskFormHeadingEl = document.getElementById('taskFormHeading');
      const noticeTitleInput = document.getElementById('noticeTitle');
      const noticeBodyInput = document.getElementById('noticeBody');
      const noticeTypeInput = document.getElementById('noticeType');
      const noticeForm = document.getElementById('noticeForm');
      const noticeFormHeadingEl = document.getElementById('noticeFormHeading');

      const loginBtn = document.getElementById('loginBtn');
      const signupBtn = document.getElementById('signupBtn');
      const logoutBtn = document.getElementById('logoutBtn');
      const toggleLoginBtn = document.getElementById('toggleLoginBtn');
      const toggleSignupBtn = document.getElementById('toggleSignupBtn');
      const togglePasswordBtn = document.getElementById('togglePasswordBtn');
      const toggleForgotPasswordBtn = document.getElementById('toggleForgotPasswordBtn');
      const saveProfileBtn = document.getElementById('saveProfileBtn');
      const changePasswordBtn = document.getElementById('changePasswordBtn');
      const sendResetLinkBtn = document.getElementById('sendResetLinkBtn');
      const bookBtn = document.getElementById('bookBtn');
      const addTaskBtn = document.getElementById('addTaskBtn');
      const toggleTaskFormBtn = document.getElementById('toggleTaskFormBtn');
      const addNoticeBtn = document.getElementById('addNoticeBtn');
      const toggleNoticeFormBtn = document.getElementById('toggleNoticeFormBtn');
      const cancelTaskFormBtn = document.getElementById('cancelTaskFormBtn');
      const cancelNoticeFormBtn = document.getElementById('cancelNoticeFormBtn');

      const authStatus = document.getElementById('authStatus');
      const bookingStatus = document.getElementById('bookingStatus');
      const taskStatus = document.getElementById('taskStatus');
      const noticeStatus = document.getElementById('noticeStatus');
      const calendarEl = document.getElementById('calendar');
      const nextStayCardEl = document.getElementById('nextStayCard');
      const weatherCardEl = document.getElementById('weatherCard');
      const authFormsEl = document.getElementById('authForms');
      const loginPanelEl = document.getElementById('loginPanel');
      const signupPanelEl = document.getElementById('signupPanel');
      const passwordPanelEl = document.getElementById('passwordPanel');
      const forgotPasswordPanelEl = document.getElementById('forgotPasswordPanel');

      const loggedOutBox = document.getElementById('loggedOutBox');
      const loggedInBox = document.getElementById('loggedInBox');
      const userEmail = document.getElementById('userEmail');
      const bookingPreviewEl = document.getElementById('bookingPreview');
      const bookingPreviewTextEl = document.getElementById('bookingPreviewText');
      const bookingPreviewMetaEl = document.getElementById('bookingPreviewMeta');
      const allBookingsEl = document.getElementById('allBookings');
      const myBookingsEl = document.getElementById('myBookings');
      const taskSummaryEl = document.getElementById('taskSummary');
      const taskListEl = document.getElementById('taskList');
      const noticeListEl = document.getElementById('noticeList');

      let selectedStart = null;
      let selectedEnd = null;
      let isLoggingIn = false;
      let isSigningUp = false;
      let isUpdatingPassword = false;
      let isSendingResetLink = false;
      let isBooking = false;
      let isSavingProfile = false;
      let isSavingTask = false;
      let isSavingNotice = false;
      let editingTaskId = null;
      let editingTaskStatus = 'not_started';
      let editingNoticeId = null;
      let currentUser = null;
      let currentUserIsAdmin = false;
      let selectedProfileColor = '#8B5E34';
      let currentBookings = [];
      let currentTasks = [];
      let currentNotices = [];
      let bookingDayMap = {};
      let availabilityMonthOffset = 0;
      let selectedCalendarDateKey = null;
      let profilesById = {};
      let mobileWeatherExpanded = false;
      let activeDeletePromptEl = null;
      let activeTaskStatusMenuEl = null;
      let activeTaskCategoryFilter = 'all';
      let activeTaskStatusFilter = 'all';
      const ACTIVE_TASK_VISIBLE_LIMIT = 4;
      const NOTICE_TYPES = {
        important: { label: 'Mikilvægt', className: 'important' },
        info: { label: 'Upplýsingar', className: 'info' }
      };
      const TASK_CATEGORIES = {
        shopping: { label: 'Innkaup', className: 'shopping' },
        maintenance: { label: 'Viðhald', className: 'maintenance' },
        cleaning: { label: 'Þrif', className: 'cleaning' },
        other: { label: 'Annað', className: 'other' }
      };
      const TASK_CATEGORY_SORT_ORDER = {
        shopping: 0,
        cleaning: 1,
        maintenance: 2,
        other: 3
      };
      const userColorOptions = [
        { value: '#8B5E34', label: 'Brúnn' },
        { value: '#B26A3C', label: 'Leir' },
        { value: '#C08A45', label: 'Gullbrúnn' },
        { value: '#6F7F4E', label: 'Mosi' },
        { value: '#496B5B', label: 'Skógargrænn' },
        { value: '#47717A', label: 'Blágrænn' },
        { value: '#6D7891', label: 'Blágrár' },
        { value: '#8A6A8D', label: 'Lyng' },
        { value: '#9B5F5D', label: 'Rauðbrúnn' },
        { value: '#A78B55', label: 'Reyr' }
      ];

      async function fetchProfiles() {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('id, display_name, color, is_admin');

        if (error) {
          throw error;
        }

        profilesById = Object.fromEntries((data || []).map((profile) => [profile.id, profile]));
        renderTaskAssigneeOptions(taskAssigneeInput?.value || '');
        return data || [];
      }

      function getNextAvailableColor() {
        const usedColors = new Set(
          Object.values(profilesById)
            .map((profile) => profile?.color)
            .filter(Boolean)
        );

        return userColorOptions.find((option) => !usedColors.has(option.value))?.value || userColorOptions[0].value;
      }

      function getUserProfile(user) {
        const profile = user?.id ? profilesById[user.id] : null;
        return {
          responsibleName: profile?.display_name || user?.user_metadata?.display_name || user?.user_metadata?.full_name || user?.user_metadata?.name || 'Óþekktur notandi',
          responsibleColor: profile?.color || user?.user_metadata?.color || userColorOptions[0].value
        };
      }

      function getSignedInLabel(user) {
        if (!user) return '';
        return getUserProfile(user).responsibleName + (currentUserIsAdmin ? ' (admin)' : '');
      }

      function setSelectedProfileColor(color) {
        selectedProfileColor = normalizeHexColor(color, userColorOptions[0].value);
        renderProfileColorChoices(selectedProfileColor);
      }

      function renderProfileColorChoices(selectedColor = selectedProfileColor) {
        if (!profileColorChoicesEl) return;

        const normalizedSelectedColor = normalizeHexColor(selectedColor, userColorOptions[0].value);
        const usedByOtherUsers = new Set(
          Object.entries(profilesById)
            .filter(([id]) => id !== currentUser?.id)
            .map(([, profile]) => normalizeHexColor(profile?.color, ''))
            .filter(Boolean)
        );
        const availableOptions = userColorOptions.filter((option) => (
          option.value === normalizedSelectedColor || !usedByOtherUsers.has(option.value)
        ));
        const hasSelectedColor = availableOptions.some((option) => option.value === normalizedSelectedColor);
        const options = hasSelectedColor
          ? availableOptions
          : [{ value: normalizedSelectedColor, label: 'Núverandi litur' }, ...availableOptions];

        profileColorChoicesEl.innerHTML = options.map((option) => {
          const safeColor = normalizeHexColor(option.value, userColorOptions[0].value);
          const safeLabel = escapeHtml(option.label);
          const isSelected = safeColor === normalizedSelectedColor;

          return `
            <button
              type="button"
              class="profile-color-swatch${isSelected ? ' selected' : ''}"
              style="--profile-color:${safeColor};"
              data-profile-color="${safeColor}"
              role="radio"
              aria-checked="${isSelected ? 'true' : 'false'}"
              aria-label="${safeLabel}"
              title="${safeLabel}"
            ></button>
          `;
        }).join('');

        profileColorChoicesEl.querySelectorAll('[data-profile-color]').forEach((button) => {
          button.addEventListener('click', () => {
            setSelectedProfileColor(button.dataset.profileColor);
          });
        });
      }

      function userCanDeleteBooking(booking, user) {
        return Boolean(user && booking && (
          currentUserIsAdmin || isAdmin(user) || booking.user_id === user.id
        ));
      }

      function getCurrentTask(id) {
        return currentTasks.find((task) => String(task.id) === String(id)) || null;
      }

      function userCanManageTask(task, user) {
        return Boolean(task && user);
      }

      function userCanDeleteTask(task, user) {
        return Boolean(
          task
          && userCanManageTask(task, user)
          && normalizeTaskStatus(task.status) === 'done'
        );
      }

      function userCanDeleteNotice(notice, user) {
        return Boolean(user && notice && (
          currentUserIsAdmin || isAdmin(user) || notice.created_by_user_id === user.id
        ));
      }

      function normalizeTaskCategory(value) {
        return Object.prototype.hasOwnProperty.call(TASK_CATEGORIES, value) ? value : 'other';
      }

      function getTaskCategoryMeta(value) {
        return TASK_CATEGORIES[normalizeTaskCategory(value)];
      }

      function taskCategorySortValue(category) {
        return TASK_CATEGORY_SORT_ORDER[normalizeTaskCategory(category)] ?? 99;
      }

      function isTaskFilterActive() {
        return activeTaskCategoryFilter !== 'all' || activeTaskStatusFilter !== 'all';
      }

      function taskMatchesActiveFilters(task) {
        const categoryMatches = activeTaskCategoryFilter === 'all'
          || normalizeTaskCategory(task.category) === activeTaskCategoryFilter;
        const statusMatches = activeTaskStatusFilter === 'all'
          || normalizeTaskStatus(task.status) === activeTaskStatusFilter;

        return categoryMatches && statusMatches;
      }

      function populateProfilePanel(user) {
        if (!profileDisplayNameInput) return;
        const profile = user ? getUserProfile(user) : null;
        profileDisplayNameInput.value = profile?.responsibleName || '';
        setSelectedProfileColor(profile?.responsibleColor || userColorOptions[0].value);
      }

      function renderTaskAssigneeOptions(selectedId = '') {
        if (!taskAssigneeInput) return;
        const options = Object.values(profilesById)
          .filter((profile) => profile?.id)
          .sort((a, b) => (a.display_name || '').localeCompare(b.display_name || '', 'is'))
          .map((profile) => `<option value="${escapeHtml(profile.id)}">${escapeHtml(profile.display_name || 'Óþekktur')}</option>`)
          .join('');

        taskAssigneeInput.innerHTML = `<option value="">Óúthlutað</option>${options}`;
        taskAssigneeInput.value = selectedId || '';
      }

      function resolveBookingPresentation(booking) {
        const profile = booking?.user_id ? profilesById[booking.user_id] : null;
        return {
          responsibleName: profile?.display_name || booking?.responsible_name || 'Óþekktur',
          responsibleColor: normalizeHexColor(profile?.color || booking?.responsible_color)
        };
      }

      function getContrastTextColor(hexColor) {
        const color = normalizeHexColor(hexColor).replace('#', '');

        const r = parseInt(color.slice(0, 2), 16);
        const g = parseInt(color.slice(2, 4), 16);
        const b = parseInt(color.slice(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 150 ? '#111827' : '#ffffff';
      }

      function formatDateKey(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      const icelandicMonthLabels = ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember'];

      function formatIcelandicMonthYear(date) {
        return `${icelandicMonthLabels[date.getMonth()]} ${date.getFullYear()}`;
      }

      function formatIcelandicMonth(date) {
        return icelandicMonthLabels[date.getMonth()];
      }

      function parseDateString(dateStr) {
        return new Date(`${dateStr}T00:00:00`);
      }

      function formatDisplayDate(dateStr, includeYear = false) {
        const date = typeof dateStr === 'string' ? parseDateString(dateStr) : dateStr;
        const base = `${date.getDate()}. ${formatIcelandicMonth(date)}`;
        return includeYear ? `${base} ${date.getFullYear()}` : base;
      }

      function formatDateRange(startDateStr, endDateStr) {
        if (!startDateStr || !endDateStr) return '';

        const startDate = parseDateString(startDateStr);
        const endDate = parseDateString(endDateStr);
        const sameYear = startDate.getFullYear() === endDate.getFullYear();

        if (startDateStr === endDateStr) {
          return formatDisplayDate(startDate);
        }

        if (sameYear) {
          return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
        }

        return `${formatDisplayDate(startDate, true)} - ${formatDisplayDate(endDate, true)}`;
      }

      function expandBookingDays(bookings) {
        const dayMap = {};

        bookings.forEach((booking) => {
          const cursor = new Date(booking.start_date + 'T12:00:00');
          const end = new Date(booking.end_date + 'T12:00:00');
          const presentation = resolveBookingPresentation(booking);

          while (cursor <= end) {
            dayMap[formatDateKey(cursor)] = {
              color: presentation.responsibleColor,
              responsibleName: presentation.responsibleName,
              startDate: booking.start_date,
              endDate: booking.end_date
            };
            cursor.setDate(cursor.getDate() + 1);
          }
        });

        return dayMap;
      }

      function escapeHtml(value) {
        return String(value ?? '')
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function normalizeHexColor(value, fallback = '#d6e4dd') {
        const color = String(value ?? '').trim();
        return /^#[0-9a-fA-F]{6}$/.test(color) ? color.toUpperCase() : fallback;
      }

      function getAvailabilityMonthCount() {
        return window.matchMedia('(max-width: 860px)').matches ? 1 : 2;
      }

      function normalizeNoticeType(value) {
        return Object.prototype.hasOwnProperty.call(NOTICE_TYPES, value) ? value : 'info';
      }

      function getNoticeTypeMeta(value) {
        return NOTICE_TYPES[normalizeNoticeType(value)];
      }

      function renderCalendarBookingNote(bookingInfo) {
        if (!bookingInfo) return '';

        const safeName = escapeHtml(bookingInfo.responsibleName);
        const safeRange = escapeHtml(formatDateRange(bookingInfo.startDate, bookingInfo.endDate));
        const safeColor = normalizeHexColor(bookingInfo.color);

        return `
          <div class="calendar-booking-note" aria-live="polite">
            <span class="calendar-booking-dot" style="background:${safeColor};" aria-hidden="true"></span>
            <span><strong>${safeName}</strong> bókaði ${safeRange}</span>
          </div>
        `;
      }

      function renderAvailabilityCalendar() {
        const monthCount = getAvailabilityMonthCount();
        const weekdayLabels = ['Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau', 'Sun'];
        const today = new Date();
        const todayKey = formatDateKey(today);
        let monthsHtml = '';

        for (let offset = 0; offset < monthCount; offset += 1) {
          const monthDate = new Date(today.getFullYear(), today.getMonth() + availabilityMonthOffset + offset, 1, 12, 0, 0);
          const year = monthDate.getFullYear();
          const month = monthDate.getMonth();
          const monthLabel = formatIcelandicMonthYear(monthDate);
          const firstWeekday = (monthDate.getDay() + 6) % 7;
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const weekdayHtml = weekdayLabels.map((label) => `<div class="calendar-weekday">${label}</div>`).join('');
          let dayCellsHtml = '';

          for (let i = 0; i < firstWeekday; i += 1) {
            dayCellsHtml += '<div class="calendar-cell blank" aria-hidden="true"></div>';
          }

          for (let day = 1; day <= daysInMonth; day += 1) {
            const date = new Date(year, month, day, 12, 0, 0);
            const key = formatDateKey(date);
            const bookingInfo = bookingDayMap[key];
            const isToday = key === todayKey;
            const classNames = ['calendar-cell'];
            const styles = [];
            let titleAttr = '';
            let bookingAttrs = '';

            if (bookingInfo) {
              classNames.push('booked');
              if (key === selectedCalendarDateKey) {
                classNames.push('selected');
              }
              styles.push(`background:${bookingInfo.color}`);
              styles.push(`color:${getContrastTextColor(bookingInfo.color)}`);
              const safeResponsibleName = escapeHtml(bookingInfo.responsibleName);
              const safeRange = escapeHtml(formatDateRange(bookingInfo.startDate, bookingInfo.endDate));
              titleAttr = ` title="${safeResponsibleName} bókaði ${safeRange}"`;
              bookingAttrs = ` role="button" tabindex="0" data-calendar-date="${key}" aria-label="${safeResponsibleName} bókaði ${safeRange}"`;
            }

            if (isToday) {
              classNames.push('today');
            }

            const styleAttr = styles.length ? ` style="${styles.join(';')}"` : '';
            dayCellsHtml += `<div class="${classNames.join(' ')}"${styleAttr}${titleAttr}${bookingAttrs}>${day}</div>`;
          }

          const totalCells = firstWeekday + daysInMonth;
          const trailingBlanks = (7 - (totalCells % 7)) % 7;

          for (let i = 0; i < trailingBlanks; i += 1) {
            dayCellsHtml += '<div class="calendar-cell blank" aria-hidden="true"></div>';
          }

          monthsHtml += `
            <div class="calendar-month">
              <div class="calendar-month-header">${monthLabel}</div>
              <div class="calendar-weekdays">${weekdayHtml}</div>
              <div class="calendar-days">${dayCellsHtml}</div>
            </div>
          `;
        }

        const selectedBookingInfo = selectedCalendarDateKey ? bookingDayMap[selectedCalendarDateKey] : null;

        calendarEl.innerHTML = `
          <div class="calendar-nav">
            <div class="calendar-nav-buttons">
              <button type="button" class="calendar-nav-btn" data-calendar-nav="prev" aria-label="Fyrri mánuðir">‹</button>
              <button type="button" class="calendar-nav-btn" data-calendar-nav="next" aria-label="Næstu mánuðir">›</button>
            </div>
          </div>
          <div class="calendar-months">${monthsHtml}</div>
          ${renderCalendarBookingNote(selectedBookingInfo)}
        `;

        calendarEl.querySelector('[data-calendar-nav="prev"]')?.addEventListener('click', () => {
          availabilityMonthOffset -= monthCount;
          selectedCalendarDateKey = null;
          renderAvailabilityCalendar();
        });

        calendarEl.querySelector('[data-calendar-nav="next"]')?.addEventListener('click', () => {
          availabilityMonthOffset += monthCount;
          selectedCalendarDateKey = null;
          renderAvailabilityCalendar();
        });

        calendarEl.querySelectorAll('[data-calendar-date]').forEach((cell) => {
          const selectDate = () => {
            const nextDateKey = cell.dataset.calendarDate;
            selectedCalendarDateKey = selectedCalendarDateKey === nextDateKey ? null : nextDateKey;
            renderAvailabilityCalendar();
          };

          cell.addEventListener('click', selectDate);
          cell.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            selectDate();
          });
        });
      }

      const flatpickrLocale = {
        firstDayOfWeek: 1,
        rangeSeparator: ' - ',
        weekdays: {
          shorthand: ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'],
          longhand: ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur']
        },
        months: {
          shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'],
          longhand: ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember']
        }
      };

      const datePicker = flatpickr(dateRangeInput, {
        mode: 'range',
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'j. F',
        minDate: 'today',
        locale: flatpickrLocale,
        prevArrow: '&#8249;',
        nextArrow: '&#8250;',
        onReady(selectedDates, dateStr, instance) {
          instance.altInput.placeholder = 'Veldu dagabil';
        },
        onChange(selectedDates, dateStr, instance) {
          if (selectedDates.length === 2) {
            selectedStart = selectedDates[0].toISOString().split('T')[0];
            selectedEnd = selectedDates[1].toISOString().split('T')[0];
            instance.altInput.value = formatDateRange(selectedStart, selectedEnd);
          } else if (selectedDates.length === 1) {
            selectedStart = selectedDates[0].toISOString().split('T')[0];
            selectedEnd = null;
            instance.altInput.value = formatDisplayDate(selectedStart);
          } else {
            selectedStart = null;
            selectedEnd = null;
            instance.altInput.value = '';
          }

          updateBookingPreview();
        }
      });

      bookBtn.disabled = true;
      renderAvailabilityCalendar();
      refreshWeather();
      fetchProfiles().catch((error) => {
        console.error(error);
      });

      let lastAvailabilityMonthCount = getAvailabilityMonthCount();
      window.addEventListener('resize', () => {
        const nextMonthCount = getAvailabilityMonthCount();
        if (nextMonthCount !== lastAvailabilityMonthCount) {
          lastAvailabilityMonthCount = nextMonthCount;
          renderAvailabilityCalendar();
        }
      });

      function getFriendlyErrorMessage(text) {
        const rawText = String(text || '').trim();
        const message = rawText.toLowerCase();

        if (!rawText) return 'Óvænt villa kom upp. Reyndu aftur.';
        if (message.includes('invalid login credentials')) return 'Netfang eða lykilorð er rangt.';
        if (message.includes('email not confirmed')) return 'Þú þarft að staðfesta netfangið áður en þú skráir þig inn.';
        if (message.includes('already registered') || message.includes('user already registered')) return 'Þessi notandi er þegar til.';
        if (message.includes('password') && (message.includes('at least') || message.includes('weak'))) return 'Lykilorðið þarf að vera sterkara eða lengra.';
        if (message.includes('invalid email') || message.includes('validate email')) return 'Netfangið virðist ekki vera rétt.';
        if (message.includes('rate limit')) return 'Of margar tilraunir í einu. Bíddu aðeins og reyndu aftur.';
        if (message.includes('failed to fetch') || message.includes('networkerror')) return 'Ekki náðist samband við þjónustuna. Athugaðu nettengingu og reyndu aftur.';
        if (message.includes('jwt') || message.includes('session')) return 'Innskráningin rann út. Skráðu þig inn aftur.';
        if (message.includes('row-level security') || message.includes('permission denied')) return 'Þú hefur ekki heimild til að gera þessa aðgerð.';
        if (message.includes('duplicate key')) return 'Þessi færsla er þegar til.';

        return rawText;
      }

      function showStatus(el, text, isError = false) {
        if (!el) return;
        el.textContent = isError ? getFriendlyErrorMessage(text) : text;
        el.classList.add('show');
        el.classList.toggle('error', isError);
        el.classList.remove('warning');
      }

      function clearStatus(el) {
        el.textContent = '';
        el.classList.remove('show', 'error', 'warning');
      }

      function formatDate(dateStr) {
        return formatDisplayDate(dateStr, true);
      }

      function countNights(startDateStr, endDateStr) {
        if (!startDateStr || !endDateStr) return 0;
        const startDate = parseDateString(startDateStr);
        const endDate = parseDateString(endDateStr);
        const diffMs = endDate.getTime() - startDate.getTime();
        return diffMs >= 0 ? Math.round(diffMs / 86400000) : 0;
      }

      function isBookingRangeAvailable(startDateStr, endDateStr) {
        if (!startDateStr || !endDateStr) return false;

        return !currentBookings.some((booking) => (
          booking.start_date <= endDateStr && booking.end_date >= startDateStr
        ));
      }

      function updateBookingPreview() {
        const guestText = fullNameInput.value.trim();
        const hasGuests = Boolean(guestText);
        const hasRange = Boolean(selectedStart && selectedEnd);
        const hasStartOnly = Boolean(selectedStart && !selectedEnd);

        if (!hasGuests && !hasRange && !hasStartOnly) {
          bookingPreviewTextEl.textContent = '';
          bookingPreviewMetaEl.textContent = '';
          bookingPreviewEl.classList.remove('show');
          bookingPreviewEl.classList.remove('available', 'unavailable');
          bookBtn.disabled = true;
          return;
        }

        const canBook = hasGuests && hasRange;
        const nights = hasRange ? countNights(selectedStart, selectedEnd) : 0;
        const rangeAvailable = hasRange ? isBookingRangeAvailable(selectedStart, selectedEnd) : false;

        if (hasRange) {
          const nightLabel = nights === 1 ? '1 nótt' : `${nights} nætur`;
          bookingPreviewTextEl.textContent = `${formatDateRange(selectedStart, selectedEnd)} · ${nightLabel}`;
        } else if (hasStartOnly) {
          bookingPreviewTextEl.textContent = `${formatDisplayDate(selectedStart)} · veldu lokadag`;
        } else {
          bookingPreviewTextEl.textContent = guestText;
        }

        if (hasRange) {
          bookingPreviewMetaEl.textContent = rangeAvailable
            ? 'Tímabil laust til bókunar.'
            : 'Þetta tímabil skarast við bókun sem er þegar til.';
        } else if (hasGuests) {
          bookingPreviewMetaEl.textContent = 'Veldu dagabil til að klára bókunina.';
        } else {
          bookingPreviewMetaEl.textContent = 'Settu inn nöfn gesta til að halda áfram.';
        }

        bookingPreviewEl.classList.add('show');
        bookingPreviewEl.classList.toggle('available', hasRange && rangeAvailable);
        bookingPreviewEl.classList.toggle('unavailable', hasRange && !rangeAvailable);
        bookBtn.disabled = isBooking || !(canBook && rangeAvailable);
      }

      function formatShortDate(dateStr) {
        const date = new Date(dateStr);
        const weekdayLabels = ['sun', 'mán', 'þri', 'mið', 'fim', 'fös', 'lau'];
        const weekday = weekdayLabels[date.getUTCDay()];
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        return `${weekday} ${day}.${month}`;
      }

      function formatDateTime(dateStr) {
        return new Date(dateStr).toLocaleString('is-IS', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      function weatherSymbolToEmoji(symbolCode) {
        const code = String(symbolCode || '');

        if (code.includes('thunder')) return '⛈';
        if (code.includes('snow')) return '❄';
        if (code.includes('sleet')) return '🌨';
        if (code.includes('rain')) return '🌧';
        if (code.includes('fog')) return '🌫';
        if (code.includes('cloudy')) return '☁';
        if (code.includes('partlycloudy')) return '⛅';
        if (code.includes('fair')) return '🌤';
        if (code.includes('clearsky')) return '☀';
        return '☁';
      }

      function weatherSymbolToText(symbolCode) {
        const code = String(symbolCode || '');

        if (code.includes('thunder')) return 'Þrumuveður';
        if (code.includes('heavyrain')) return 'Mikil rigning';
        if (code.includes('rain')) return 'Rigning';
        if (code.includes('snow')) return 'Snjókoma';
        if (code.includes('sleet')) return 'Éljagangur';
        if (code.includes('fog')) return 'Þoka';
        if (code.includes('partlycloudy')) return 'Hálfskýjað';
        if (code.includes('cloudy')) return 'Skýjað';
        if (code.includes('fair')) return 'Bjart með köflum';
        if (code.includes('clearsky')) return 'Heiðskírt';
        return 'Veðurspá';
      }

      function getWeatherIconClass(symbolCode) {
        const code = String(symbolCode || '');

        if (code.includes('thunder')) return 'weather-icon-storm';
        if (code.includes('snow')) return 'weather-icon-snow';
        if (code.includes('sleet')) return 'weather-icon-sleet';
        if (code.includes('rain')) return 'weather-icon-rain';
        if (code.includes('fog')) return 'weather-icon-fog';
        if (code.includes('cloudy')) return 'weather-icon-cloud';
        if (code.includes('partlycloudy')) return 'weather-icon-partly';
        if (code.includes('fair')) return 'weather-icon-fair';
        if (code.includes('clearsky')) return 'weather-icon-clear';
        return 'weather-icon-cloud';
      }

      function getTemperatureClass(temp) {
        return Number(temp) > 0 ? 'temp-above-freezing' : 'temp-freezing';
      }

      function getWindDirectionInfo(degrees) {
        if (typeof degrees !== 'number' || Number.isNaN(degrees)) {
          return { label: '', arrow: '' };
        }

        const directions = [
          { label: 'N', arrow: '↑' },
          { label: 'NA', arrow: '↗' },
          { label: 'A', arrow: '→' },
          { label: 'SA', arrow: '↘' },
          { label: 'S', arrow: '↓' },
          { label: 'SV', arrow: '↙' },
          { label: 'V', arrow: '←' },
          { label: 'NV', arrow: '↖' }
        ];

        const normalized = ((degrees % 360) + 360) % 360;
        const index = Math.round(normalized / 45) % directions.length;
        return directions[index];
      }

      function renderWeatherCard(weather) {
        if (!weather) {
          weatherCardEl.innerHTML = `
            <div class="weather-card">
              <div class="muted">Veðurspá ekki tiltæk í augnablikinu.</div>
            </div>
          `;
          return;
        }

        const windDirection = weather.windDirection?.label
          ? `${weather.windDirection.arrow} ${weather.windDirection.label}`
          : '';
        const isMobile = window.matchMedia('(max-width: 860px)').matches;

        const forecastHtml = (weather.days || []).map((day) => `
          <div class="weather-day">
            <div class="weather-day-label">${day.label}</div>
            <div class="weather-day-icon ${day.iconClass || ''}">${day.icon}</div>
            <div class="weather-day-temp ${getTemperatureClass(day.temp)}">${day.temp}°C</div>
            <div class="weather-day-wind">${day.windDirection.arrow} ${day.windDirection.label} · ${day.wind} m/s</div>
          </div>
        `).join('');

        weatherCardEl.innerHTML = `
          <div class="weather-card${isMobile && mobileWeatherExpanded ? ' mobile-forecast-open' : ''}">
            <div class="weather-main">
              <div class="weather-icon ${weather.iconClass || ''}">${weather.icon}</div>
              <div>
                <div class="weather-temp ${getTemperatureClass(weather.temperature)}">${weather.temperature}°C</div>
                <div class="weather-desc">${weather.description}</div>
              </div>
            </div>
            <div class="weather-meta">
              Vindur: ${windDirection ? `${windDirection} · ` : ''}${weather.wind} m/s<br />
              Úrkoma næsta klst.: ${weather.precipitation} mm
            </div>
            <button type="button" class="weather-forecast-toggle" aria-controls="weatherForecast" aria-expanded="${mobileWeatherExpanded ? 'true' : 'false'}">
              ${mobileWeatherExpanded ? 'Fela næstu daga' : 'Sjá næstu daga'}
            </button>
            <div id="weatherForecast" class="weather-forecast">${forecastHtml}</div>
          </div>
        `;

        const toggleBtn = weatherCardEl.querySelector('.weather-forecast-toggle');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', () => {
            mobileWeatherExpanded = !mobileWeatherExpanded;
            renderWeatherCard(weather);
          });
        }
      }

      async function refreshWeather() {
        try {
          const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${WEATHER_LOCATION.lat}&lon=${WEATHER_LOCATION.lon}`;
          const response = await fetch(url, {
            headers: {
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Weather request failed');
          }

          const payload = await response.json();
          const timeseries = payload?.properties?.timeseries || [];
          const now = timeseries[0];
          const instant = now?.data?.instant?.details;
          const nextHour = now?.data?.next_1_hours;

          if (!instant) {
            throw new Error('Weather data missing');
          }

          const dailyMap = new Map();
          timeseries.forEach((entry) => {
            const isoTime = entry.time;
            const dateKey = isoTime.slice(0, 10);
            const hour = new Date(isoTime).getUTCHours();

            if (dailyMap.has(dateKey)) {
              return;
            }

            if (hour >= 11 && hour <= 14) {
              dailyMap.set(dateKey, entry);
            }
          });

          if (dailyMap.size < 4) {
            timeseries.forEach((entry) => {
              const dateKey = entry.time.slice(0, 10);
              if (!dailyMap.has(dateKey)) {
                dailyMap.set(dateKey, entry);
              }
            });
          }

          const forecastDays = Array.from(dailyMap.values())
            .slice(0, 4)
            .map((entry) => ({
              label: formatShortDate(entry.time),
              temp: Math.round(entry?.data?.instant?.details?.air_temperature ?? 0),
              wind: Math.round((entry?.data?.instant?.details?.wind_speed ?? 0) * 10) / 10,
              windDirection: getWindDirectionInfo(entry?.data?.instant?.details?.wind_from_direction),
              icon: weatherSymbolToEmoji(entry?.data?.next_6_hours?.summary?.symbol_code || entry?.data?.next_1_hours?.summary?.symbol_code),
              iconClass: getWeatherIconClass(entry?.data?.next_6_hours?.summary?.symbol_code || entry?.data?.next_1_hours?.summary?.symbol_code)
            }));

          renderWeatherCard({
            temperature: Math.round(instant.air_temperature ?? 0),
            wind: Math.round((instant.wind_speed ?? 0) * 10) / 10,
            windDirection: getWindDirectionInfo(instant.wind_from_direction),
            precipitation: Math.round(((nextHour?.details?.precipitation_amount ?? 0) * 10)) / 10,
            description: weatherSymbolToText(nextHour?.summary?.symbol_code),
            icon: weatherSymbolToEmoji(nextHour?.summary?.symbol_code),
            iconClass: getWeatherIconClass(nextHour?.summary?.symbol_code),
            days: forecastDays
          });
        } catch (error) {
          console.error(error);
          renderWeatherCard(null);
        }
      }

      function isAdmin(user) {
        const profile = user?.id ? profilesById[user.id] : null;
        return Boolean(profile?.is_admin);
      }

      async function resolveCurrentUser() {
        const { data: userData } = await supabaseClient.auth.getUser();
        if (userData?.user) {
          return userData.user;
        }

        const { data: sessionData } = await supabaseClient.auth.getSession();
        return sessionData?.session?.user || null;
      }

      function renderBookings(list, container, currentUserId, ownOnly = false, canDeleteAll = false) {
      const filtered = ownOnly
        ? list.filter((item) => item.user_id === currentUserId)
        : list;

      if (!filtered.length) {
        const emptyText = ownOnly
          ? (currentUserId ? 'Þú átt enga bókun skráða eins og er.' : 'Skráðu þig inn til að sjá þínar bókanir.')
          : 'Engar bókanir eru skráðar enn.';
        container.innerHTML = `<div class="empty booking-empty">${emptyText}</div>`;
        return;
      }

      container.innerHTML = filtered.map((item) => {
        const safeItemId = escapeHtml(item.id);
        const deleteButton = (ownOnly && userCanDeleteBooking(item, { id: currentUserId })) || canDeleteAll
          ? '<button class="icon-delete-btn" type="button" data-delete-id="' + safeItemId + '" title="Eyða bókun" aria-label="Eyða bókun">×</button>'
          : '';

        const guestNames = escapeHtml(item.booked_by_name || 'Óþekktir gestir');
        const presentation = resolveBookingPresentation(item);
        const bookedByName = escapeHtml(presentation.responsibleName);
        const badgeColor = presentation.responsibleColor;
        return `
          <div class="booking-item" style="--booking-color:${badgeColor};">
            <div class="booking-main">
              <div class="booking-marker" aria-hidden="true"></div>
              <div class="booking-details">
                <div class="booking-dates">${formatDateRange(item.start_date, item.end_date)}</div>
                <div class="booking-line">Gestir: ${guestNames}</div>
                <div class="booking-booker">${bookedByName} bókaði</div>
              </div>
            </div>
            <div class="booking-actions">${deleteButton}</div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('[data-delete-id]').forEach((btn) => {
        btn.addEventListener('click', async () => {
          btn.blur();
          showInlineDeletePrompt(btn, 'Eyða bókun?', async () => {
            await deleteBooking(btn.dataset.deleteId);
          });
        });
      });
      }

      function renderNextStay(bookings) {
        const todayKey = formatDateKey(new Date());
        const upcoming = bookings
          .filter((item) => item.end_date >= todayKey)
          .slice(0, 3);

        if (!upcoming.length) {
          nextStayCardEl.innerHTML = '<div class="empty">Ekkert á döfinni eins og er.</div>';
          return;
        }

        nextStayCardEl.innerHTML = `
          <div class="agenda-list">
            ${upcoming.map((item, index) => {
              const isCurrent = item.start_date <= todayKey && item.end_date >= todayKey;
              const statusText = getBookingTimingText(item, todayKey, isCurrent);
              const guestNames = escapeHtml(item.booked_by_name || 'Óþekktir gestir');
              const presentation = resolveBookingPresentation(item);
              const bookedByName = escapeHtml(presentation.responsibleName);
              const badgeColor = presentation.responsibleColor;
              const itemClass = index === 0 ? 'agenda-item primary' : 'agenda-item';

              return `
                <div class="${itemClass}" style="--agenda-color:${badgeColor};">
                  <div class="agenda-marker" aria-hidden="true"></div>
                  <div class="agenda-content">
                    <div class="agenda-status">${statusText}</div>
                    <div class="summary-line">Gestir: ${guestNames}</div>
                    <div class="agenda-booker">${bookedByName} bókaði</div>
                    <div class="summary-dates">${formatDateRange(item.start_date, item.end_date)}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      function getBookingTimingText(booking, todayKey, isCurrent) {
        if (isCurrent) return 'Nú í gangi';
        if (booking.start_date === todayKey) return 'Í dag';

        const daysUntil = Math.round((parseDateString(booking.start_date).getTime() - parseDateString(todayKey).getTime()) / 86400000);
        if (daysUntil === 1) return 'Á morgun';
        if (daysUntil > 1) return `Eftir ${daysUntil} daga`;
        return 'Á döfinni';
      }

      function toggleAuthPanel(panel) {
        const showingLogin = !authFormsEl.classList.contains('hidden') && !loginPanelEl.classList.contains('hidden');
        const showingSignup = !authFormsEl.classList.contains('hidden') && !signupPanelEl.classList.contains('hidden');
        const showingPassword = !authFormsEl.classList.contains('hidden') && !passwordPanelEl.classList.contains('hidden');
        const showingForgotPassword = !authFormsEl.classList.contains('hidden') && !forgotPasswordPanelEl.classList.contains('hidden');
        const openLogin = panel === 'login' && !showingLogin;
        const openSignup = panel === 'signup' && !showingSignup;
        const openPassword = panel === 'password' && !showingPassword;
        const openForgotPassword = panel === 'forgot-password' && !showingForgotPassword;

        authFormsEl.classList.toggle('hidden', !(openLogin || openSignup || openPassword || openForgotPassword));
        loginPanelEl.classList.toggle('hidden', !openLogin);
        signupPanelEl.classList.toggle('hidden', !openSignup);
        passwordPanelEl.classList.toggle('hidden', !openPassword);
        forgotPasswordPanelEl.classList.toggle('hidden', !openForgotPassword);
        toggleLoginBtn.setAttribute('aria-expanded', String(openLogin));
        toggleSignupBtn.setAttribute('aria-expanded', String(openSignup));
        togglePasswordBtn.setAttribute('aria-expanded', String(openPassword));
        toggleForgotPasswordBtn.setAttribute('aria-expanded', String(openForgotPassword));

        if (openPassword) {
          populateProfilePanel(currentUser);
        }

      }

      function normalizeTaskStatus(status) {
        if (status === 'open' || status === 'claimed' || !status) return 'not_started';
        if (status === 'in_progress' || status === 'on_hold' || status === 'done' || status === 'not_started') return status;
        return 'not_started';
      }

      function taskStatusLabel(status) {
        const normalized = normalizeTaskStatus(status);
        if (normalized === 'in_progress') return 'Í vinnslu';
        if (normalized === 'on_hold') return 'Í bið';
        if (normalized === 'done') return 'Lokið';
        return 'Ekki hafið';
      }

      function taskStatusOptions() {
        return [
          { value: 'not_started', label: 'Ekki hafið' },
          { value: 'in_progress', label: 'Í vinnslu' },
          { value: 'on_hold', label: 'Í bið' },
          { value: 'done', label: 'Lokið' }
        ];
      }

      function taskStatusSortValue(status) {
        const normalized = normalizeTaskStatus(status);
        if (normalized === 'not_started') return 0;
        if (normalized === 'in_progress') return 1;
        if (normalized === 'on_hold') return 2;
        if (normalized === 'done') return 3;
        return 4;
      }

      function countTasksByStatus(tasks) {
        return taskStatusOptions().reduce((counts, option) => {
          counts[option.value] = tasks.filter((task) => normalizeTaskStatus(task.status) === option.value).length;
          return counts;
        }, {});
      }

      function countTasksByCategory(tasks) {
        return Object.keys(TASK_CATEGORIES).reduce((counts, category) => {
          counts[category] = tasks.filter((task) => normalizeTaskCategory(task.category) === category).length;
          return counts;
        }, {});
      }

      function renderTaskSummary(tasks, currentUser) {
        if (!taskSummaryEl) return;

        const countsByStatus = countTasksByStatus(tasks);
        const statusCards = [
          { key: 'not_started', label: 'Ekki hafið', value: countsByStatus.not_started, className: 'open' },
          { key: 'in_progress', label: 'Í vinnslu', value: countsByStatus.in_progress, className: 'in-progress' },
          { key: 'on_hold', label: 'Í bið', value: countsByStatus.on_hold, className: 'on-hold' },
          { key: 'done', label: 'Lokið', value: countsByStatus.done, className: 'done' }
        ];
        const categoryCounts = countTasksByCategory(tasks);
        const categoryChips = Object.entries(TASK_CATEGORIES)
          .map(([key, meta]) => ({ key, ...meta, value: categoryCounts[key] || 0 }))
          .filter((item) => item.value > 0)
          .map((item) => `
            <button
              class="task-summary-chip ${item.className} ${activeTaskCategoryFilter === item.key ? 'selected' : ''}"
              type="button"
              data-task-category-filter="${item.key}"
              aria-pressed="${activeTaskCategoryFilter === item.key}"
            >
              <span>${item.label}</span>
              <strong>${item.value}</strong>
            </button>
          `)
          .join('');
        const filterTools = isTaskFilterActive()
          ? `
            <div class="task-filter-row">
              <span>Sía virk</span>
              <button type="button" data-clear-task-filters>Hreinsa síu</button>
            </div>
          `
          : '';

        taskSummaryEl.innerHTML = `
          ${categoryChips ? `<div class="task-summary-categories">${categoryChips}</div>` : ''}
          <div class="task-summary-statuses">
            ${statusCards.map((card) => `
              <button
                class="task-summary-stat ${card.className} ${activeTaskStatusFilter === card.key ? 'selected' : ''}"
                type="button"
                data-task-status-filter="${card.key}"
                aria-pressed="${activeTaskStatusFilter === card.key}"
              >
                <span>${card.label}</span>
                <strong>${card.value}</strong>
              </button>
            `).join('')}
          </div>
          ${filterTools}
        `;

        taskSummaryEl.querySelectorAll('[data-task-category-filter]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const nextCategory = btn.dataset.taskCategoryFilter;
            activeTaskCategoryFilter = activeTaskCategoryFilter === nextCategory ? 'all' : nextCategory;
            renderTasks(tasks, currentUser || null);
          });
        });

        taskSummaryEl.querySelectorAll('[data-task-status-filter]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const nextStatus = btn.dataset.taskStatusFilter;
            activeTaskStatusFilter = activeTaskStatusFilter === nextStatus ? 'all' : nextStatus;
            renderTasks(tasks, currentUser || null);
          });
        });

        taskSummaryEl.querySelector('[data-clear-task-filters]')?.addEventListener('click', () => {
          activeTaskCategoryFilter = 'all';
          activeTaskStatusFilter = 'all';
          renderTasks(tasks, currentUser || null);
        });
      }

      function renderTaskItem(task, currentUser) {
        const status = normalizeTaskStatus(task.status);
        const canClaim = currentUser && !task.claimed_by_user_id && status !== 'done';
        const canEdit = userCanManageTask(task, currentUser);
        const canDelete = userCanDeleteTask(task, currentUser);
        const categoryMeta = getTaskCategoryMeta(task.category);
        const safeTaskId = escapeHtml(task.id);
        const safeTitle = escapeHtml(task.title);
        const safeNotes = escapeHtml(task.notes);
        const safeAssigneeName = escapeHtml(task.claimed_by_name);
        const notesText = task.notes ? `<div class="task-notes">${safeNotes}</div>` : '';
        const assigneeText = task.claimed_by_name
          ? `<div class="task-owner-line"><span class="task-owner-label">Eigandi:</span><span class="task-owner-name">${safeAssigneeName}</span></div>`
          : '';
        const statusText = canEdit
          ? `<button class="task-status task-status-toggle ${status}" type="button" data-task-status-menu="${safeTaskId}" aria-label="Breyta stöðu">${taskStatusLabel(status)} <span class="task-status-caret">▾</span></button>`
          : `<span class="task-status ${status}">${taskStatusLabel(status)}</span>`;
        const headerMeta = `<div class="task-header-meta"><span class="task-category-label ${categoryMeta.className}">${categoryMeta.label}</span><span class="task-header-separator">•</span>${statusText}</div>`;
        const metaParts = [`Skráð ${formatDateTime(task.created_at)}`];

        metaParts.push(task.claimed_by_name ? 'Úthlutað' : 'Óúthlutað');

        const editButton = canEdit ? `<button class="task-action-soft task-action-edit" type="button" data-edit-task="${safeTaskId}">Breyta</button>` : '';
        const claimButton = canClaim ? `<button class="task-action-soft task-action-claim" type="button" data-claim-task="${safeTaskId}">Taka að mér</button>` : '';
        const deleteButton = canDelete ? `<button class="icon-delete-btn" type="button" data-delete-task="${safeTaskId}" title="Eyða úr lista" aria-label="Eyða úr lista">×</button>` : '';
        const metaActions = `${editButton}`;
        const secondaryActions = `${claimButton}`;
        const metaText = `
          <div class="task-meta-row">
            <span>${metaParts.join(' · ')}</span>
            ${metaActions ? `<span class="task-meta-actions">${metaActions}</span>` : ''}
          </div>
        `;
        const secondaryActionText = secondaryActions
          ? `<div class="task-secondary-actions">${secondaryActions}</div>`
          : '';

        return `
          <div class="task-item">
            <div class="task-top">
              ${headerMeta}
              <div class="task-title">${safeTitle}</div>
              ${notesText}
              ${secondaryActionText}
              ${assigneeText}
              ${metaText}
            </div>
            ${deleteButton}
          </div>
        `;
      }

      function renderTasks(list, currentUser) {
        renderTaskSummary(list, currentUser);

        if (!list.length) {
          taskListEl.innerHTML = '<div class="empty">Engin verkefni enn.</div>';
          return;
        }

        const sortedTasks = [...list].sort((a, b) => {
          const categoryDiff = taskCategorySortValue(a.category) - taskCategorySortValue(b.category);
          if (categoryDiff !== 0) return categoryDiff;

          const statusDiff = taskStatusSortValue(a.status) - taskStatusSortValue(b.status);
          if (statusDiff !== 0) return statusDiff;

          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });

        const filteredTasks = sortedTasks.filter(taskMatchesActiveFilters);
        const filterIsActive = isTaskFilterActive();

        if (!filteredTasks.length) {
          taskListEl.innerHTML = '<div class="empty">Engin verkefni passa við síuna.</div>';
          return;
        }

        const activeTasks = filteredTasks.filter((task) => normalizeTaskStatus(task.status) !== 'done');
        const completedTasks = filteredTasks.filter((task) => normalizeTaskStatus(task.status) === 'done');
        const shouldLimitActiveTasks = !filterIsActive;
        const visibleActiveTasks = shouldLimitActiveTasks ? activeTasks.slice(0, ACTIVE_TASK_VISIBLE_LIMIT) : activeTasks;
        const hiddenActiveTasks = shouldLimitActiveTasks ? activeTasks.slice(ACTIVE_TASK_VISIBLE_LIMIT) : [];
        const activeHtml = activeTasks.length
          ? `
            ${visibleActiveTasks.map((task) => renderTaskItem(task, currentUser)).join('')}
            ${hiddenActiveTasks.length ? `
              <details class="extra-tasks">
                <summary>Sjá fleiri verkefni (${hiddenActiveTasks.length})</summary>
                <div class="extra-tasks-list">
                  ${hiddenActiveTasks.map((task) => renderTaskItem(task, currentUser)).join('')}
                </div>
              </details>
            ` : ''}
          `
          : '';
        const completedHtml = completedTasks.length && activeTaskStatusFilter === 'done'
          ? completedTasks.map((task) => renderTaskItem(task, currentUser)).join('')
          : completedTasks.length
          ? `
            <details class="completed-tasks">
              <summary>Lokið (${completedTasks.length})</summary>
              <div class="completed-tasks-list">
                ${completedTasks.map((task) => renderTaskItem(task, currentUser)).join('')}
              </div>
            </details>
          `
          : '';

        taskListEl.innerHTML = `${activeHtml}${completedHtml}`;

        taskListEl.querySelectorAll('[data-claim-task]').forEach((btn) => {
          btn.addEventListener('click', async () => {
            await claimTask(btn.dataset.claimTask);
          });
        });

        taskListEl.querySelectorAll('[data-edit-task]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const task = list.find((item) => String(item.id) === String(btn.dataset.editTask));
            if (!task) return;
            startTaskEdit(task);
          });
        });

        taskListEl.querySelectorAll('[data-task-status-menu]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const task = list.find((item) => String(item.id) === String(btn.dataset.taskStatusMenu));
            if (!task) return;
            showTaskStatusMenu(btn, task);
          });
        });

        taskListEl.querySelectorAll('[data-delete-task]').forEach((btn) => {
          btn.addEventListener('click', async () => {
            btn.blur();
            showInlineDeletePrompt(btn, 'Eyða verkefni?', async () => {
              await deleteTask(btn.dataset.deleteTask);
            });
          });
        });
      }

      function renderNotices(list) {
        if (!list.length) {
          noticeListEl.innerHTML = '<div class="empty">Engar tilkynningar eins og er.</div>';
          return;
        }

        noticeListEl.innerHTML = list.map((notice) => {
          const safeNoticeId = escapeHtml(notice.id);
          const safeTitle = escapeHtml(notice.title);
          const safeBody = notice.body ? `<div class="notice-body">${escapeHtml(notice.body)}</div>` : '';
          const safeCreatedBy = notice.created_by_name ? ` · frá ${escapeHtml(notice.created_by_name)}` : '';
          const typeMeta = getNoticeTypeMeta(notice.type);
          const editButton = currentUserIsAdmin
            ? `<button class="task-action-soft task-action-edit" type="button" data-edit-notice="${safeNoticeId}">Breyta</button>`
            : '';
          const deleteButton = userCanDeleteNotice(notice, currentUser)
            ? `<button class="icon-delete-btn" type="button" data-delete-notice="${safeNoticeId}" title="Eyða tilkynningu" aria-label="Eyða tilkynningu">×</button>`
            : '';

          return `
            <div class="notice-item">
              <div class="task-top">
                <div class="notice-type-label ${typeMeta.className}">${typeMeta.label}</div>
                <div class="notice-title">${safeTitle}</div>
                ${safeBody}
                <div class="notice-meta">
                  <span>${formatDateTime(notice.created_at)}${safeCreatedBy}</span>
                  ${editButton}
                </div>
              </div>
              ${deleteButton}
            </div>
          `;
        }).join('');

        noticeListEl.querySelectorAll('[data-edit-notice]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const notice = list.find((item) => String(item.id) === String(btn.dataset.editNotice));
            if (!notice) return;
            startNoticeEdit(notice);
          });
        });

        noticeListEl.querySelectorAll('[data-delete-notice]').forEach((btn) => {
          btn.addEventListener('click', async () => {
            btn.blur();
            showInlineDeletePrompt(btn, 'Eyða tilkynningu?', async () => {
              await deleteNotice(btn.dataset.deleteNotice);
            });
          });
        });
      }

      function clearInlineDeletePrompt() {
        if (!activeDeletePromptEl) return;
        activeDeletePromptEl.remove();
        activeDeletePromptEl = null;
      }

      function clearTaskStatusMenu() {
        if (!activeTaskStatusMenuEl) return;
        activeTaskStatusMenuEl.remove();
        activeTaskStatusMenuEl = null;
      }

      function updateNoticeControls() {
        const canCreateNotices = Boolean(currentUser);
        toggleNoticeFormBtn.classList.toggle('hidden', !canCreateNotices);

        if (!canCreateNotices) {
          noticeForm.classList.add('hidden');
          toggleNoticeFormBtn.setAttribute('aria-expanded', 'false');
          resetNoticeForm();
        }
      }

      function showInlineDeletePrompt(button, message, onConfirm) {
        const host = button.closest('.booking-item, .task-item, .notice-item');
        if (!host) return;

        if (activeDeletePromptEl && activeDeletePromptEl.parentElement === host) {
          clearInlineDeletePrompt();
          return;
        }

        clearInlineDeletePrompt();

        const prompt = document.createElement('div');
        prompt.className = 'inline-delete-confirm';
        prompt.innerHTML = `
          <div class="inline-delete-confirm-text">${message}</div>
          <div class="inline-delete-confirm-actions">
            <button type="button" class="inline-delete-confirm-btn confirm">Eyða</button>
            <button type="button" class="inline-delete-confirm-btn cancel">Hætta við</button>
          </div>
        `;

        const confirmBtn = prompt.querySelector('.confirm');
        const cancelBtn = prompt.querySelector('.cancel');

        confirmBtn.addEventListener('click', async (event) => {
          event.stopPropagation();
          confirmBtn.disabled = true;
          cancelBtn.disabled = true;
          await onConfirm();
          clearInlineDeletePrompt();
        });

        cancelBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          clearInlineDeletePrompt();
        });

        prompt.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        host.appendChild(prompt);
        activeDeletePromptEl = prompt;
      }

      function showTaskStatusMenu(button, task) {
        const host = button.closest('.task-item');
        if (!host) return;

        if (activeTaskStatusMenuEl && activeTaskStatusMenuEl.parentElement === host) {
          clearTaskStatusMenu();
          return;
        }

        clearTaskStatusMenu();
        clearInlineDeletePrompt();

        const currentStatus = normalizeTaskStatus(task.status);
        const menu = document.createElement('div');
        menu.className = 'task-status-menu';
        menu.innerHTML = taskStatusOptions().map((option) => `
          <button
            type="button"
            class="task-status-menu-btn${option.value === currentStatus ? ' active' : ''}"
            data-task-status-value="${option.value}"
          >${option.label}</button>
        `).join('');

        menu.querySelectorAll('[data-task-status-value]').forEach((menuBtn) => {
          menuBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            const nextStatus = menuBtn.dataset.taskStatusValue;
            if (nextStatus === currentStatus) {
              clearTaskStatusMenu();
              return;
            }
            await updateTaskStatus(task.id, nextStatus);
            clearTaskStatusMenu();
          });
        });

        menu.addEventListener('click', (event) => {
          event.stopPropagation();
        });

        host.appendChild(menu);
        activeTaskStatusMenuEl = menu;
      }

      document.addEventListener('click', (event) => {
        if (!activeDeletePromptEl) return;
        if (activeDeletePromptEl.contains(event.target)) return;
        if (event.target.closest('.icon-delete-btn')) return;
        clearInlineDeletePrompt();
      });

      document.addEventListener('click', (event) => {
        if (!activeTaskStatusMenuEl) return;
        if (activeTaskStatusMenuEl.contains(event.target)) return;
        if (event.target.closest('[data-task-status-menu]')) return;
        clearTaskStatusMenu();
      });

      function toggleNoticeForm(forceOpen = null) {
        if (!currentUser) {
          noticeForm.classList.add('hidden');
          toggleNoticeFormBtn.setAttribute('aria-expanded', 'false');
          resetNoticeForm();
          showStatus(noticeStatus, 'Þú þarft að vera skráð(ur) inn til að bæta við tilkynningu.', true);
          return;
        }

        const shouldOpen = forceOpen === null
          ? noticeForm.classList.contains('hidden')
          : forceOpen;

        noticeForm.classList.toggle('hidden', !shouldOpen);
        toggleNoticeFormBtn.classList.toggle('hidden', shouldOpen);
        toggleNoticeFormBtn.setAttribute('aria-expanded', String(shouldOpen));

        if (!shouldOpen) {
          resetNoticeForm();
        }
      }

      function toggleTaskForm(forceOpen = null) {
        const shouldOpen = forceOpen === null
          ? taskForm.classList.contains('hidden')
          : forceOpen;

        taskForm.classList.toggle('hidden', !shouldOpen);
        toggleTaskFormBtn.classList.toggle('hidden', shouldOpen);
        toggleTaskFormBtn.setAttribute('aria-expanded', String(shouldOpen));

        if (shouldOpen) {
          renderTaskAssigneeOptions(taskAssigneeInput?.value || '');
        }

        if (!shouldOpen) {
          resetTaskForm();
        }
      }

      function resetTaskForm() {
        editingTaskId = null;
        editingTaskStatus = 'not_started';
        taskTitleInput.value = '';
        taskCategoryInput.value = 'other';
        renderTaskAssigneeOptions('');
        taskStatusSelect.value = 'not_started';
        taskNotesInput.value = '';
        addTaskBtn.textContent = 'Skrá verkefni';
        if (taskFormHeadingEl) {
          taskFormHeadingEl.textContent = 'Nýtt verkefni';
        }
      }

      function resetNoticeForm() {
        editingNoticeId = null;
        noticeTitleInput.value = '';
        noticeBodyInput.value = '';
        noticeTypeInput.value = 'info';
        addNoticeBtn.textContent = 'Skrá tilkynningu';
        if (noticeFormHeadingEl) {
          noticeFormHeadingEl.textContent = 'Ný tilkynning';
        }
      }

      function startNoticeEdit(notice) {
        editingNoticeId = notice.id;
        noticeTitleInput.value = notice.title || '';
        noticeBodyInput.value = notice.body || '';
        noticeTypeInput.value = normalizeNoticeType(notice.type);
        addNoticeBtn.textContent = 'Vista breytingar';
        if (noticeFormHeadingEl) {
          noticeFormHeadingEl.textContent = 'Breyta tilkynningu';
        }
        toggleNoticeForm(true);
        noticeTitleInput.focus();
      }

      function startTaskEdit(task) {
        editingTaskId = task.id;
        editingTaskStatus = normalizeTaskStatus(task.status);
        taskTitleInput.value = task.title || '';
        taskCategoryInput.value = normalizeTaskCategory(task.category);
        renderTaskAssigneeOptions(task.claimed_by_user_id || '');
        taskStatusSelect.value = editingTaskStatus;
        taskNotesInput.value = task.notes || '';
        addTaskBtn.textContent = 'Vista breytingar';
        if (taskFormHeadingEl) {
          taskFormHeadingEl.textContent = 'Breyta verkefni';
        }
        toggleTaskForm(true);
        taskTitleInput.focus();
      }

      async function fetchBookings() {
        const { data, error } = await supabaseClient
          .from('bookings')
          .select('id, user_id, start_date, end_date, created_at, booked_by_name, responsible_name, responsible_color')
          .order('start_date', { ascending: true });

      if (error) {
        showStatus(bookingStatus, error.message, true);
        return [];
      }

      return data || [];
      }

      async function fetchTasks() {
        const { data, error } = await supabaseClient
          .from('tasks')
          .select('id, title, category, notes, status, created_at, claimed_by_user_id, claimed_by_name, completed_at')
          .order('created_at', { ascending: false });

        if (error) {
          showStatus(taskStatus, error.message, true);
          return [];
        }

        return data || [];
      }

      async function fetchNotices() {
        const { data, error } = await supabaseClient
          .from('notices')
          .select('id, title, body, type, created_at, created_by_user_id, created_by_name')
          .order('created_at', { ascending: false });

        if (error) {
          showStatus(noticeStatus, error.message, true);
          return [];
        }

        return data || [];
      }

      async function refreshBookings() {
      const user = currentUser || await resolveCurrentUser();
      const bookings = await fetchBookings();
      currentBookings = bookings;
      const adminUser = currentUserIsAdmin || isAdmin(user);

      renderBookings(bookings, allBookingsEl, user?.id || null, false, adminUser);
      renderBookings(bookings, myBookingsEl, user?.id || null, true, adminUser);
      renderNextStay(bookings);

        const disabledRanges = bookings.map((b) => ({
          from: b.start_date,
          to: b.end_date
        }));

      bookingDayMap = expandBookingDays(bookings);
      if (selectedCalendarDateKey && !bookingDayMap[selectedCalendarDateKey]) {
        selectedCalendarDateKey = null;
      }
      renderAvailabilityCalendar();
      updateBookingPreview();

      datePicker.set('disable', disabledRanges);
    }

      async function refreshTasks() {
      const user = currentUser || await resolveCurrentUser();
      const tasks = await fetchTasks();
      currentTasks = tasks;
      renderTasks(tasks, user || null);
      }

      async function refreshNotices() {
      const notices = await fetchNotices();
      currentNotices = notices;
      renderNotices(notices);
      }

      async function deleteBooking(id) {
      clearStatus(bookingStatus);

      const user = await resolveCurrentUser();
      const booking = currentBookings.find((item) => String(item.id) === String(id));

      if (!user) {
        showStatus(bookingStatus, 'Þú þarft að vera skráð(ur) inn til að eyða bókun.', true);
        return;
      }

      if (!userCanDeleteBooking(booking, user)) {
        showStatus(bookingStatus, 'Þú getur aðeins eytt eigin bókunum nema þú sért admin.', true);
        return;
      }

      let query = supabaseClient
        .from('bookings')
        .delete()
        .eq('id', id);

      if (!(currentUserIsAdmin || isAdmin(user))) {
        query = query.eq('user_id', user.id);
      }

      const { error } = await query;

      if (error) {
        showStatus(bookingStatus, error.message, true);
        return;
      }

      showStatus(bookingStatus, 'Bókun eytt.');
      await Promise.all([refreshBookings(), refreshTasks(), refreshNotices()]);
      }

      async function addTask() {
      if (isSavingTask) return;
      isSavingTask = true;
      clearStatus(taskStatus);
      addTaskBtn.disabled = true;

      try {
        const title = taskTitleInput.value.trim();
        const category = normalizeTaskCategory(taskCategoryInput.value);
        const assigneeId = taskAssigneeInput.value || '';
        const assigneeProfile = assigneeId ? profilesById[assigneeId] : null;
        const selectedStatus = normalizeTaskStatus(taskStatusSelect.value);
        const notes = taskNotesInput.value.trim();
        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
          showStatus(taskStatus, 'Þú þarft að vera skráð(ur) inn til að bæta við verkefni.', true);
          return;
        }

        if (!title) {
          showStatus(taskStatus, 'Skráðu fyrst heiti verkefnis.', true);
          return;
        }

        if (editingTaskId && !getCurrentTask(editingTaskId)) {
          showStatus(taskStatus, 'Verkefnið fannst ekki. Endurhlaðaðu síðuna og reyndu aftur.', true);
          return;
        }

        let query = editingTaskId
          ? supabaseClient
              .from('tasks')
              .update({
                title,
                category,
                notes: notes || null,
                claimed_by_user_id: assigneeId || null,
                claimed_by_name: assigneeProfile?.display_name || null,
                status: selectedStatus,
                completed_at: selectedStatus === 'done' ? new Date().toISOString() : null
              })
              .eq('id', editingTaskId)
          : supabaseClient
              .from('tasks')
              .insert([
                {
                  title,
                  category,
                  notes: notes || null,
                  status: selectedStatus,
                  claimed_by_user_id: assigneeId || null,
                  claimed_by_name: assigneeProfile?.display_name || null,
                  completed_at: selectedStatus === 'done' ? new Date().toISOString() : null
                }
              ]);

        const { error } = await query;

        if (error) {
          showStatus(taskStatus, error.message, true);
          return;
        }

        const wasEditing = Boolean(editingTaskId);
        resetTaskForm();
        showStatus(taskStatus, wasEditing ? 'Verkefni uppfært.' : 'Verkefni skráð.');
        toggleTaskForm(false);
        await refreshTasks();
      } finally {
        isSavingTask = false;
        addTaskBtn.disabled = false;
      }
      }

      async function addNotice() {
      if (isSavingNotice) return;
      isSavingNotice = true;
      clearStatus(noticeStatus);
      addNoticeBtn.disabled = true;

      try {
        const title = noticeTitleInput.value.trim();
        const body = noticeBodyInput.value.trim();
        const type = normalizeNoticeType(noticeTypeInput.value);
        const user = await resolveCurrentUser();

        if (!user) {
          showStatus(noticeStatus, 'Þú þarft að vera skráð(ur) inn til að bæta við tilkynningu.', true);
          return;
        }

        if (editingNoticeId && !(currentUserIsAdmin || isAdmin(user))) {
          showStatus(noticeStatus, 'Aðeins admin getur breytt tilkynningum.', true);
          return;
        }

        if (!title) {
          showStatus(noticeStatus, 'Skráðu fyrst heiti tilkynningar.', true);
          return;
        }

        const profile = getUserProfile(user);
        const query = editingNoticeId
          ? supabaseClient
              .from('notices')
              .update({
                title,
                body: body || null,
                type
              })
              .eq('id', editingNoticeId)
          : supabaseClient
              .from('notices')
              .insert([
                {
                  title,
                  body: body || null,
                  type,
                  created_by_user_id: user.id,
                  created_by_name: profile.responsibleName
                }
              ]);

        const { error } = await query;

        if (error) {
          showStatus(noticeStatus, error.message, true);
          return;
        }

        const wasEditing = Boolean(editingNoticeId);
        resetNoticeForm();
        showStatus(noticeStatus, wasEditing ? 'Tilkynning uppfærð.' : 'Tilkynning skráð.');
        toggleNoticeForm(false);
        await refreshNotices();
      } finally {
        isSavingNotice = false;
        addNoticeBtn.disabled = false;
      }
      }

      async function deleteNotice(id) {
      clearStatus(noticeStatus);

      const user = await resolveCurrentUser();
      const notice = currentNotices.find((item) => String(item.id) === String(id));

      if (!user) {
        showStatus(noticeStatus, 'Þú þarft að vera skráð(ur) inn til að eyða tilkynningu.', true);
        return;
      }

      if (!userCanDeleteNotice(notice, user)) {
        showStatus(noticeStatus, 'Þú getur aðeins eytt eigin tilkynningum nema þú sért admin.', true);
        return;
      }

      let query = supabaseClient
        .from('notices')
        .delete()
        .eq('id', id);

      if (!(currentUserIsAdmin || isAdmin(user))) {
        query = query.eq('created_by_user_id', user.id);
      }

      const { error } = await query;

      if (error) {
        showStatus(noticeStatus, error.message, true);
        return;
      }

      await refreshNotices();
      }

      async function claimTask(id) {
      clearStatus(taskStatus);

      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) {
        showStatus(taskStatus, 'Þú þarft að vera skráð(ur) inn til að taka verk að þér.', true);
        return;
      }

      const profile = getUserProfile(user);
      const { error } = await supabaseClient
        .from('tasks')
        .update({
          claimed_by_user_id: user.id,
          claimed_by_name: profile.responsibleName
        })
        .eq('id', id)
        .neq('status', 'done');

      if (error) {
        showStatus(taskStatus, error.message, true);
        return;
      }

      await refreshTasks();
      }

      async function updateTaskStatus(id, nextStatus) {
      clearStatus(taskStatus);

      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) {
        showStatus(taskStatus, 'Þú þarft að vera skráð(ur) inn til að breyta stöðu verkefnis.', true);
        return;
      }

      const task = getCurrentTask(id);
      if (!userCanManageTask(task, user)) {
        showStatus(taskStatus, 'Verkefnið fannst ekki. Endurhlaðaðu síðuna og reyndu aftur.', true);
        return;
      }

      const normalizedStatus = normalizeTaskStatus(nextStatus);
      const { error } = await supabaseClient
        .from('tasks')
        .update({
          status: normalizedStatus,
          completed_at: normalizedStatus === 'done' ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) {
        showStatus(taskStatus, error.message, true);
        return;
      }

      await refreshTasks();
      }

      async function deleteTask(id) {
      clearStatus(taskStatus);

      const { data: { user } } = await supabaseClient.auth.getUser();
      if (!user) {
        showStatus(taskStatus, 'Þú þarft að vera skráð(ur) inn til að eyða verkefni.', true);
        return;
      }

      const task = getCurrentTask(id);
      if (!userCanDeleteTask(task, user)) {
        showStatus(taskStatus, 'Aðeins er hægt að eyða verkefnum sem eru merkt lokið.', true);
        return;
      }

      const { error } = await supabaseClient
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('status', 'done');

      if (error) {
        showStatus(taskStatus, error.message, true);
        return;
      }

      await refreshTasks();
      }

      async function signup() {
      if (isSigningUp) return;
      isSigningUp = true;
      clearStatus(authStatus);
      signupBtn.disabled = true;
      const originalSignupText = signupBtn.textContent;
      signupBtn.textContent = 'Stofna notanda...';

      try {
        const email = signupEmailInput.value.trim();
        const password = signupPasswordInput.value;
        const displayName = signupNameInput.value.trim();
        const color = getNextAvailableColor();

      if (!email || !password || !displayName) {
        showStatus(authStatus, 'Settu inn netfang, lykilorð og nafn notanda.', true);
        return;
      }

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            color
          }
        }
      });

      if (error) {
        showStatus(authStatus, error.message, true);
        return;
      }

      const newUserId = data?.user?.id;
      if (newUserId) {
        const { error: profileError } = await supabaseClient
          .from('profiles')
          .upsert({
            id: newUserId,
            email,
            display_name: displayName,
            color
          });

        if (profileError) {
          showStatus(authStatus, profileError.message, true);
          return;
        }

        await fetchProfiles();
      }

      const colorLabel = userColorOptions.find((option) => option.value === color)?.label || 'valinn';
      showStatus(authStatus, `Notandi búinn til. Liturinn þinn er ${colorLabel.toLowerCase()}. Athugaðu hvort staðfestingarpóstur hafi verið sendur.`);
      signupEmailInput.value = '';
      signupPasswordInput.value = '';
      signupNameInput.value = '';
      authFormsEl.classList.add('hidden');
      signupPanelEl.classList.add('hidden');
      } finally {
        isSigningUp = false;
        signupBtn.disabled = false;
        signupBtn.textContent = originalSignupText;
      }
      }

      async function loginWithPassword() {
      if (isLoggingIn) return;
      isLoggingIn = true;
      clearStatus(authStatus);
      loginBtn.disabled = true;
      showStatus(authStatus, 'Reyni að skrá inn...');

      try {
        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        if (!email || !password) {
          showStatus(authStatus, 'Settu inn netfang og lykilorð.', true);
          return;
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          showStatus(authStatus, error.message, true);
          return;
        }

        await fetchProfiles().catch(() => []);
        showStatus(authStatus, 'Innskráning tókst.');
        currentUser = data.user;
        currentUserIsAdmin = isAdmin(data.user);
        updateNoticeControls();
        loggedOutBox.classList.add('hidden');
        loggedInBox.classList.remove('hidden');
        userEmail.textContent = getSignedInLabel(data.user);
        authFormsEl.classList.add('hidden');
        loginPanelEl.classList.add('hidden');
        passwordPanelEl.classList.add('hidden');
        forgotPasswordPanelEl.classList.add('hidden');

        Promise.all([refreshBookings(), refreshTasks(), refreshNotices()]).catch((refreshError) => {
          showStatus(authStatus, 'Innskráning tókst en ekki tókst að hlaða gögn: ' + refreshError.message, true);
        });
      } catch (error) {
        showStatus(authStatus, error.message || 'Óvænt villa kom upp í innskráningu.', true);
      } finally {
        isLoggingIn = false;
        loginBtn.disabled = false;
      }
      }

      async function sendPasswordResetLink() {
      if (isSendingResetLink) return;
      isSendingResetLink = true;
      clearStatus(authStatus);
      sendResetLinkBtn.disabled = true;

      try {
        const email = forgotPasswordEmailInput.value.trim();

        if (!email) {
          showStatus(authStatus, 'Settu inn netfang til að fá endurstillingarhlekk.', true);
          return;
        }

        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo
        });

        if (error) {
          showStatus(authStatus, error.message, true);
          return;
        }

        forgotPasswordEmailInput.value = '';
        toggleAuthPanel('forgot-password');
        showStatus(authStatus, 'Við sendum þér tölvupóst með hlekk til að endurstilla lykilorðið.');
      } finally {
        isSendingResetLink = false;
        sendResetLinkBtn.disabled = false;
      }
      }

      async function logout() {
      clearStatus(authStatus);

      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        showStatus(authStatus, error.message, true);
        return;
      }

      showStatus(authStatus, 'Þú hefur verið skráð(ur) út.');
      await updateAuthUI();
      }

      async function saveProfile() {
      if (isSavingProfile) return;
      isSavingProfile = true;
      clearStatus(authStatus);
      saveProfileBtn.disabled = true;

      try {
        const user = await resolveCurrentUser();
        const displayName = profileDisplayNameInput.value.trim();
        const color = normalizeHexColor(selectedProfileColor, userColorOptions[0].value);

        if (!user) {
          showStatus(authStatus, 'Þú þarft að vera skráð(ur) inn til að breyta upplýsingum.', true);
          return;
        }

        if (!displayName) {
          showStatus(authStatus, 'Settu inn nafn áður en þú vistar.', true);
          return;
        }

        const { error: profileError } = await supabaseClient
          .from('profiles')
          .update({
            display_name: displayName,
            color
          })
          .eq('id', user.id);

        if (profileError) {
          showStatus(authStatus, profileError.message, true);
          return;
        }

        const { error: userError } = await supabaseClient.auth.updateUser({
          data: {
            ...(user.user_metadata || {}),
            display_name: displayName,
            color
          }
        });

        if (userError) {
          showStatus(authStatus, userError.message, true);
          return;
        }

        await fetchProfiles().catch(() => []);
        currentUser = {
          ...user,
          user_metadata: {
            ...(user.user_metadata || {}),
            display_name: displayName,
            color
          }
        };
        userEmail.textContent = getSignedInLabel(currentUser);
        renderProfileColorChoices(color);
        await refreshBookings().catch(() => {});
        showStatus(authStatus, 'Upplýsingar uppfærðar.');
      } finally {
        isSavingProfile = false;
        saveProfileBtn.disabled = false;
      }
      }

      async function changePassword() {
      if (isUpdatingPassword) return;
      isUpdatingPassword = true;
      clearStatus(authStatus);
      changePasswordBtn.disabled = true;

      try {
        const user = await resolveCurrentUser();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (!user) {
          showStatus(authStatus, 'Þú þarft að vera skráð(ur) inn til að breyta lykilorði.', true);
          return;
        }

        if (!newPassword || !confirmPassword) {
          showStatus(authStatus, 'Settu inn nýtt lykilorð og staðfestingu.', true);
          return;
        }

        if (newPassword.length < 6) {
          showStatus(authStatus, 'Nýja lykilorðið þarf að vera að minnsta kosti 6 stafir.', true);
          return;
        }

        if (newPassword !== confirmPassword) {
          showStatus(authStatus, 'Lykilorðin passa ekki saman.', true);
          return;
        }

        const { error } = await supabaseClient.auth.updateUser({
          password: newPassword
        });

        if (error) {
          showStatus(authStatus, error.message, true);
          return;
        }

        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
        toggleAuthPanel('password');
        showStatus(authStatus, 'Lykilorði breytt.');
      } finally {
        isUpdatingPassword = false;
        changePasswordBtn.disabled = false;
      }
      }

      async function updateAuthUI() {
      const user = await resolveCurrentUser();
      await fetchProfiles().catch(() => []);
      currentUser = user;
      currentUserIsAdmin = isAdmin(user);

      if (user) {
        loggedOutBox.classList.add('hidden');
        loggedInBox.classList.remove('hidden');
        userEmail.textContent = getSignedInLabel(user);
        logoutBtn.classList.remove('hidden');
        togglePasswordBtn.classList.remove('hidden');
        toggleLoginBtn.classList.add('hidden');
        toggleSignupBtn.classList.add('hidden');
        authFormsEl.classList.add('hidden');
        forgotPasswordPanelEl.classList.add('hidden');
      } else {
        loggedOutBox.classList.remove('hidden');
        loggedInBox.classList.add('hidden');
        userEmail.textContent = '';
        currentUser = null;
        currentUserIsAdmin = false;
        logoutBtn.classList.add('hidden');
        togglePasswordBtn.classList.add('hidden');
        toggleLoginBtn.classList.remove('hidden');
        toggleSignupBtn.classList.remove('hidden');
        passwordPanelEl.classList.add('hidden');
        forgotPasswordPanelEl.classList.add('hidden');
      }

      updateNoticeControls();

      await Promise.all([refreshBookings(), refreshTasks(), refreshNotices()]);
      }

      async function createBooking() {
      if (isBooking) return;
      isBooking = true;
      clearStatus(bookingStatus);
      bookBtn.disabled = true;
      bookBtn.textContent = 'Bóka...';

      try {
        const start_date = selectedStart;
        const end_date = selectedEnd;
        const fullName = fullNameInput.value.trim();

        if (!fullName) {
          showStatus(bookingStatus, 'Settu inn nafn.', true);
          return;
        }

        if (!start_date || !end_date) {
          showStatus(bookingStatus, 'Veldu dagabil fyrst.', true);
          return;
        }

        if (end_date < start_date) {
          showStatus(bookingStatus, 'Lokadagur má ekki vera á undan upphafsdegi.', true);
          return;
        }

        const { data: { user } } = await supabaseClient.auth.getUser();

        if (!user) {
          showStatus(bookingStatus, 'Þú þarft að vera skráð(ur) inn til að bóka.', true);
          return;
        }

        const profile = getUserProfile(user);

        const { data: overlappingBookings, error: overlapError } = await supabaseClient
          .from('bookings')
          .select('id')
          .lte('start_date', end_date)
          .gte('end_date', start_date)
          .limit(1);

        if (overlapError) {
          showStatus(bookingStatus, overlapError.message, true);
          return;
        }

        if (overlappingBookings && overlappingBookings.length > 0) {
          showStatus(bookingStatus, 'Þetta tímabil skarast við bókun sem er þegar til.', true);
          return;
        }

        const { error } = await supabaseClient
          .from('bookings')
          .insert([
            {
              user_id: user.id,
              start_date,
              end_date,
              booked_by_name: fullName,
              responsible_name: profile.responsibleName,
              responsible_color: profile.responsibleColor
            }
          ]);

        if (error) {
          showStatus(bookingStatus, error.message, true);
          return;
        }

        showStatus(bookingStatus, 'Bókun skráð.');
        fullNameInput.value = '';
        selectedStart = null;
        selectedEnd = null;
        datePicker.clear();
        updateBookingPreview();
        await refreshBookings();
      } catch (error) {
        showStatus(bookingStatus, error.message || 'Óvænt villa kom upp við bókun.', true);
      } finally {
        isBooking = false;
        bookBtn.textContent = 'Bóka';
        updateBookingPreview();
      }
      }

      window.loginNow = loginWithPassword;
      window.bookNow = createBooking;

      signupBtn.addEventListener('click', signup);
      logoutBtn.addEventListener('click', logout);
      toggleLoginBtn.addEventListener('click', () => {
        toggleAuthPanel('login');
      });
      toggleSignupBtn.addEventListener('click', () => {
        toggleAuthPanel('signup');
      });
      toggleForgotPasswordBtn.addEventListener('click', () => {
        forgotPasswordEmailInput.value = loginEmailInput.value.trim();
        toggleAuthPanel('forgot-password');
      });
      togglePasswordBtn.addEventListener('click', () => {
        toggleAuthPanel('password');
      });
      saveProfileBtn.addEventListener('click', saveProfile);
      addTaskBtn.addEventListener('click', addTask);
      toggleTaskFormBtn.addEventListener('click', () => {
        resetTaskForm();
        toggleTaskForm();
      });
      cancelTaskFormBtn.addEventListener('click', () => {
        toggleTaskForm(false);
      });
      addNoticeBtn.addEventListener('click', addNotice);
      toggleNoticeFormBtn.addEventListener('click', () => {
        resetNoticeForm();
        toggleNoticeForm();
      });
      cancelNoticeFormBtn.addEventListener('click', () => {
        toggleNoticeForm(false);
      });
      loginBtn.addEventListener('click', () => {
        window.loginNow();
      });
      changePasswordBtn.addEventListener('click', changePassword);
      sendResetLinkBtn.addEventListener('click', sendPasswordResetLink);
      fullNameInput.addEventListener('input', updateBookingPreview);
      bookBtn.addEventListener('click', () => {
        window.bookNow();
      });

      supabaseClient.auth.onAuthStateChange((event) => {
        window.setTimeout(() => {
          if (event === 'PASSWORD_RECOVERY') {
            newPasswordInput.value = '';
            confirmPasswordInput.value = '';
            toggleAuthPanel('password');
            showStatus(authStatus, 'Veldu nýtt lykilorð til að klára endurstillingu.');
          }

          updateAuthUI().catch((error) => {
            showStatus(authStatus, error.message || 'Ekki tókst að uppfæra innskráningarstöðu.', true);
          });
        }, 0);
      });

      updateAuthUI().catch((error) => {
        showBootError(error.message || 'Ekki tókst að hlaða notandastöðu.');
      });

      window.setTimeout(() => {
        Promise.all([refreshTasks(), refreshNotices()]).catch(() => {});
      }, 300);
    }
