<template>
  <div class="d-flex alert-box" style="gap: 8px">
    <div>
      <v-icon size="13px" color="warning">fas fa-exclamation-triangle</v-icon>
    </div>
    <section>
      <span class="warning--text"
        >Pastikan agar range donasi yang dimasukkan tidak memiliki gap, sehingga
        setiap range donasi akan memiliki satu badge, jika strukturnya salah
        maka ada kemungkinan tidak ada badge yang terdeteksi ketika user berada
        di titik range donasi yang tidak terdaftar, contohnya dibawah ini.</span
      >

      <section class="d-flex" style="gap: 8px; margin-top: 10px">
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <img src="../../../../assets/badge-iron.png" alt="" height="20px" />
          <span>10.000 - 100.000</span>
        </div>
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <img src="../../../../assets/badge-gold.png" alt="" height="20px" />
          <span
            >100.001 -
            <span class="primary--text">2.000.000</span>
          </span>
        </div>
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <span class="primary--text">SALAH!</span>
          <span><span class="primary--text">3.000.000</span> - 4.000.000</span>
        </div>
      </section>

      <section class="d-flex" style="gap: 8px; margin-top: 8px">
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <img src="../../../../assets/badge-iron.png" alt="" height="20px" />
          <span>10.000 - 100.000</span>
        </div>
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <img src="../../../../assets/badge-gold.png" alt="" height="20px" />
          <span>100.001 - <span class="success--text">2.000.000</span></span>
        </div>
        <div
          class="d-flex flex-column justify-space-between align-center alert-content"
        >
          <span class="success--text">RANGE BENAR</span>
          <span><span class="success--text">2.000.001</span> - 4.000.000</span>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  &-box {
    border-radius: 4px;
    background: $primarylowtint;
    padding: 12px;
    font-size: 11px;
    font-weight: 500;
  }
  &-content {
    height: 46px;
    width: 146px;
    background: white;
    padding: 3px 8px;
    font-size: 12px;
  }
}
</style>
