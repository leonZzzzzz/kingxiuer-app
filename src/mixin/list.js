const list = {
  methods: {
    apiGetList(type, start, end) {
      this.$http.get('/ovulate/getImage.do', { type, start, end })
        .then((res) => {
          this.list = res.data.content0.rows.map((data) => {
            let img = this.$imgHost;
            const time = data.measureTime.split(' ');
            if (data.imageUrl) {
              img += data.imageUrl;
            } else {
              img += '/attachments/assets/img/null.jpg';
            }
            const ym = time[0].replace(/-/, '/').split('/');
            const newData = { ...data, yyyy: ym[0], mm: ym[1], time: time[1], imageUrl: img };
            return newData;
          });
          localStorage.setItem('LISTDATA', JSON.stringify(this.list));
        })
        .catch((e) => {
          this.toast(`${e.data.errMsg}`);
        });
    },
  },
};
export default list;
