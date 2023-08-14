import moment from "moment";
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
    vodUrl (item) {
      if(item.vodUrl) {
        return item.vodUrl
      }else{
        const url = item.url
        const hrefURL = new URL(url)
        const pathName = hrefURL.pathname
        const origin = hrefURL.origin
        const splitPathName = pathName.split('/')
        const lastIndex = splitPathName.pop()
        const splitLastIndex = lastIndex.split('.')
        const [first, second] = splitLastIndex
        const newFormatFileUrl = `${first}_h265.${second}`
        const joinPathName = `${splitPathName.join("/")}/${newFormatFileUrl}`
        const fullPath = `${origin}${joinPathName}`
        return fullPath
      }
    },
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
      const formatted = moment(rawDate).format("DD MMM hh:mm A");
      return formatted;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatThousandToKMB(num) {
      return Math.abs(num) > 999999999
        ? Math.sign(num) * (Math.abs(num) / 1000000000).toFixed(1) + "B"
        : Math.abs(num) > 999999
        ? Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M"
        : Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K"
        : Math.sign(num) * Math.abs(num);
    },
  },
};
