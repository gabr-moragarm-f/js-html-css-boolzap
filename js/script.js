var app = new Vue({
  el: '#root',
  data:{
    // dati "server" -----------------------------------------------------------
    contacts: [
      {
        name: 'Michele',
        avatar: 'img/avatar_1.jpg',
        visible: true,
        messages: [
          {
            date: '10/1/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/1/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/1/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: 'img/avatar_2.jpg',
        visible: true,
        messages: [
          {
            date: '20/3/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/3/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/3/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: 'img/avatar_3.jpg',
        visible: true,
        messages: [
          {
            date: '28/3/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/3/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/3/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: 'img/avatar_4.jpg',
        visible: true,
        messages: [
          {
            date: '10/1/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/1/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],
    // -------------------------------------------------------------------------
    indexSelectedContact: '0', // indice della chat selezionata
    inputMessage: '',  // input dei nuovi messaggi
    inputSearch: '', // input per la ricerca dei contatti
  },
  methods:{
    // metodo che estrae il giorno di una proprietà date -----------------------
    takeDay:function(date) {
      let day = date.slice(0, 2);

      if (isNaN(day)) {
        day = date.slice(0,1);
      }

      return day;
    },
    // metodo che estrae il mese di una proprietà date -------------------------
    takeMonth:function(date) {
      let monthFirstPosition = 3;

      let monthLastPosition = 5;

      if (this.takeDay(date).length === 1) {
        monthFirstPosition--;

        monthLastPosition--;
      }

      let month = date.slice(monthFirstPosition, monthLastPosition);

      if (isNaN(month)) {
        monthLastPosition--;

        month = date.slice(monthFirstPosition, monthLastPosition);
      }

      return month;
    },
    // metodo che estrae la data di una proprietà date -------------------------
    takeDate:function(date) {
      let dateLength = 10;

      if (this.takeDay(date).length === 1) {
        dateLength--;
      }

      if (this.takeMonth(date).length === 1) {
        dateLength--;
      }

      let dateSlice = date.slice(0, dateLength);

      return dateSlice;
    },
    // metodo che estrae l'ora di una proprietà date ---------------------------
    takeFullHour:function(date) {
      let hourFirstPosition = 12;

      if (this.takeDay(date).length === 1) {
        hourFirstPosition--;
      }

      if (this.takeMonth(date).length === 1) {
        hourFirstPosition--;
      }

      let fullHour = date.slice(hourFirstPosition, date.length);

      return fullHour;
    },
    // metodo che estrae l'ora senza secondi di una proprietà date -------------
    takeHour:function(date) {
      let fullHour = this.takeFullHour(date);

      let hour = fullHour.slice(0, (fullHour.length - 3));

      return hour;
    },
    // metodo che altera la proprietà visible degli oggetti contacts -----------
    visibleCheck: function() {  // volevo per forza usare la proprietà visible per filtrare ma a parere mio era meglio senza
      if (this.inputSearch === '') {
        this.contacts = this.contacts.map((element, index, array) => {
          element.visible = true;

          return element;
        });
      }else {
        this.contacts = this.contacts.map((element, index, array) => {
          if (this.contacts[index].name.toLowerCase().startsWith(this.inputSearch.toLowerCase())) {
            element.visible = true;

            return element;
          }
          element.visible = false;

          return element;
        });
      }
    },
    // controllo per lo stile della chat attiva --------------------------------
    isActiveIndex: function(i) {
      if (i === this.indexSelectedContact) {
        return ' active';
      }else{
        return '';
      }
    },
    isActiveFocus: function(i) {
      console.log('ok');
      // if (i === this.indexSelectedContact) {
      //   return ' active';
      // }else{
      //   return '';
      // }
    },
    // metodo che fornisce la data attuale -------------------------------------
    localeDate: function(i) {
      return new Date().toLocaleDateString();
    },
    // metodo che fornisce l'ora attuale ---------------------------------------
    localeHour: function(i) {
      return new Date().toLocaleTimeString();
    },
    // metodo che decide se mostrare il giorno o l'ora dell'ultimo messaggio ---
    lastMessageTime: function(date) {
      if (this.takeDate(date) === this.localeDate()) {
        return this.takeHour(date);
      }

      return this.takeDate(date);
    },
    // metodo che invia i messaggi creati dall'utente --------------------------
    sendMessage: function() {
      if (this.inputMessage !== '') {
        this.contacts[this.indexSelectedContact].messages.push({
          date: (this.localeDate() + ' ' + this.localeHour()),
          text: this.inputMessage,
          status: 'sent'
        });

        this.inputMessage = ''

        setTimeout(this.answerRammus, 1000);  // risposta automatica
      }
    },
    // metodo che invia una risposta automatica standard -----------------------
    answerRammus: function() {
      this.contacts[this.indexSelectedContact].messages.push({
        date: (this.localeDate() + ' ' + this.localeHour()),
        text: 'ok',
        status: 'received'
      });
    }
  }
});

Vue.config.devtools = true;
