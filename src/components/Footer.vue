<template>
<div class="">

  <aside class="ms-footbar">
    <div class="container">
      <div class="row">
        <div class="col-md-4 ms-footer-col">
          <div class="ms-footbar-block">
            <h3 class="ms-footbar-title">Social Media</h3>
            <div class="ms-footbar-social">
              <a href="https://www.facebook.com/Tiro.Libre16/" class="btn-circle btn-facebook">
                  <i class="fa fa-facebook"></i>
                </a>
              <a href="https://www.linkedin.com/in/tiro-libre-425094121/" class="btn-circle btn-linkedin">
                  <i class="fab fa-linkedin"></i>
                </a>
              <a href="https://www.instagram.com/tirolibre.it/" class="btn-circle btn-instagram">
                  <i class="fa fa-instagram"></i>
                </a>
            </div>
          </div>
        </div>
        <div class="col-md-5 col-sm-7 ms-footer-col ms-footer-alt-color">
          <div class="ms-footbar-block">
            <h3 class="ms-footbar-title text-center mb-2">Ultimi Articoli</h3>
            <div class="ms-footer-media">
              <div class="media">
                <div class="media-left media-middle">
                  <a href="javascript:void(0)">
                        <img class="media-object media-object-circle" src="https://www.memorieoralidegliiblei.it/wp-content/uploads/2018/03/seo-article-icon.png" alt="Articolo"> </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                        <a href="http://startupitalia.eu/74671-20170629-calciatore-svincolato-tirolibre-oggi-calciomercato-fai">Calciatore svincolato? Con Tirolibre da oggi il calciomercato è "fai da te"</a>
                      </h4>
                </div>
              </div>
              <div class="media">
                <div class="media-left media-middle">
                  <a href="javascript:void(0)">
                          <img class="media-object media-object-circle" src="https://www.memorieoralidegliiblei.it/wp-content/uploads/2018/03/seo-article-icon.png" alt="Articolo"> </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                          <a href="https://www.tuttocampo.it/Lazio/News/1274410/in-arrivo-a-roma-la-fiera-calcistica-organizzata-da-tiro-libre#.W7JUeBMzbyh">In arrivo a Roma la Fiera calcistica organizzata da "Tiro Libre"</a>
                        </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-5 ms-footer-col ms-footer-text-right">
          <div class="ms-footbar-block">
            <div class="ms-footbar-title">
              <img src="../assets/images/TiroLibreLogo_black.png" class="d-inline-block align-top" alt="TiroLibre" width="150px">
            </div>
            <address class="no-mb">
                  <p>
                    Via Marsala, 29/H</p>
                  <p>
                    00185 Roma IT</p>
                  <p>
                    P.IVA: IT 14602891005
                  </p>
                </address>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <footer class="ms-footer">
    <div class="container">
      <p>Copyright &copy; TiroLibre 2018</p>
      <ul class="footer-nav">
        <li><a href="https://www.iubenda.com/privacy-policy/7839753">Privacy Policy</a></li>
        <li><a href="https://www.iubenda.com/privacy-policy/7839753/cookie-policy">Cookie Policy</a></li>
      </ul>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.ms-footer {
    padding: 1.2rem 0;
    text-align: center;
    background-color: #3b4c55;
    color: #bdbdbd;
    box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.14), inset 0 3px 1px -2px rgba(0, 0, 0, 0.2), inset 0 1px 5px 0 rgba(0, 0, 0, 0.12);

    p:last-child {
        margin-bottom: 0;
    }
    a {
        color: #FFF !important;
    }
}

.color-danger-light {
    color: #f48a88;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
}
.color-warning-light {
    color: #ffb54a;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
}
.color-info-light {
    color: #3cccde;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
}
.btn-circle {
    height: 50px;
    width: 50px;
    color: #616161;
    display: inline-block;
    border-radius: 200rem;
    text-align: center;
    line-height: 50px;
    position: relative;
    z-index: 1;
    transition: color ease 0.5s;
    transition: box-shadow ease-in-out 0s;
    border: 0;
    background-color: transparent;
}
.btn-facebook {
    background-color: #3b5998 !important;
}
.btn-instagram {
    background-color: #e4405f !important;
}
.btn-linkedin {
    background-color: #0078ba !important;
}
.ms-footbar {
    background-color: #607d8b;
    color: #eee;
    position: relative;
    margin-top: 40px;
    margin-top: 4rem;

    &:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        top: -10px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        height: 10px;
        z-index: 1;
    }

    &:before {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        top: -15px;
        height: 15px;
        z-index: 2;
        background-color: #f5f5f5;
    }

    a {
        color: #fff;
        transition: all ease 0.3s;

        &:focus,
        &:hover {
            color: #ffa726;
        }
    }

    .ms-footbar-block {
        margin: 2rem 0;
        p {
            color: #FFF !important;
        }

        .ms-footbar-title {
            margin: 0 0 1.5rem;
        }
    }
}

.three_cols {
    width: 100%;
    overflow: hidden;

    li {
        float: left;
        width: 33.333%;

        a {
            display: block;
            padding: 2px 0;

            i {
                margin-right: 10px;
                width: 15px;
                text-align: center;
                color: #26c6da;
            }

            &:hover i {
                transition: all ease 0.5s;
                color: #ffa726;
                -webkit-transform: rotateY(360deg);
                transform: rotateY(360deg);
            }
        }
    }
}

.ms-footer-alt-color {
    background-color: #455a64;
}

.ms-footer-media {
    .media {
        margin-bottom: 45px;
        margin-bottom: 4.5rem;

        a {
            color: #FFF !important;
        }
        &:last-child {
            margin-bottom: 0;
        }

        img {
            max-width: 50px;
            border-radius: 50%;
            margin-right: 10px;
            margin-right: 1rem;
            border: solid 1px #607d8b;
        }

        .media-body .media-heading {
            margin-top: 0;
            text-align: left;
            font-size: 15px;
            font-size: 1rem;
            line-height: 25px;
            line-height: 1.5rem;
        }
    }

    .media-footer {
        font-size: 12px;
        font-size: 1.2rem;
        color: #bdbdbd;

        span {
            margin-right: 10px;
            margin-right: 1rem;

            i {
                margin-left: 1px;
                margin-left: 0.1rem;
                margin-right: 5px;
                margin-right: 0.5rem;
            }
        }
    }
}

.ms-footbar-social a {
    margin: 0 0 1rem 1rem;
    background-color: #455a64;
    color: #f5f5f5 !important;

    &:hover i {
        transition: all ease 0.4s;
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.ms-footer-text-right {
    text-align: right;
}
@media (max-width: 991px) {
    .ms-footer-alt-color {
        background-color: transparent;
    }
}
@media (max-width: 767px) {
    .ms-footer-alt-color {
        // margin: 5rem 0;
    }

    .ms-footer-text-right {
        text-align: center;

        .ms-footbar-social a {
            margin-left: 0;
            margin-right: 1rem;
        }
    }
}
</style>
