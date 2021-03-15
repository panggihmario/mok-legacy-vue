export default {
  data() {
    return {
      listMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ],
    };
  },
  methods: {
    formatingDate(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const newFormat = `${day}/${month}/${year}`;
      return newFormat;
    },
    formatingDateWithHours(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const year = newDt.getFullYear();
      const hours = newDt.getHours();
      const minutes = newDt.getMinutes();
      const newFormat = `${day}/${month}/${year} ${hours}:${
        minutes >= 10 ? minutes : `0${minutes}`
      }`;
      return newFormat;
    },
    formatingDateTracking(rawDate) {
      const newDt = new Date(rawDate);
      const day = newDt.getDate();
      const month = newDt.getMonth() + 1;
      const hours = newDt.getHours();
      const minutes = newDt.getMinutes();
      const newFormat = `${day} ${this.listMonths[month]} ${hours}:${
        minutes >= 10 ? minutes : `0${minutes}`
      } ${hours > 12 ? "PM" : "AM"}`;
      return newFormat;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
