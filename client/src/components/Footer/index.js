import React from "react";
import { Grid } from "@material-ui/core";
import { listLogoFooter } from "../../FakeData";
import "./footer.scss";

export default function Footer() {
  return (
    <div id="footer">
      <Grid container spacing={3} className="footer-container">
        <Grid item xs={4} className="footer-top-item">
          <p className="footer-top-title">TIX</p>
          <Grid item xs={6} className="footer-top-policy">
            <a href="/" className="footer-top-policy-link">
              FAQ
            </a>
            <a href="/" className="footer-top-policy-link">
              Brand Guidelines
            </a>
          </Grid>
          <Grid item xs={6} className="footer-top-policy">
            <a href="/" className="footer-top-policy-link">
              Thỏa thuận sử dụng
            </a>
            <a href="/" className="footer-top-policy-link">
              Chính sách bảo mật
            </a>
          </Grid>
        </Grid>
        <Grid item xs={4} className="footer-top-item">
          <p className="footer-top-title">Đối tác</p>
          {listLogoFooter.map((arrayLogo) => (
            <div className="footer-top-partner">
              {arrayLogo.map((item, index) => (
                <a href="/" className="footer-top-partner-item" key={index}>
                  <img src={item.img} alt="" />
                </a>
              ))}
            </div>
          ))}
        </Grid>
        <Grid container item xs={4} className="footer-top-item">
          <Grid item xs={6}>
            <p className="footer-top-title">MOBILE APP</p>
            <a href="/">
              <img
                src="/img/Footer/apple-logo.png"
                alt=""
                className="footer-top-app"
              />
            </a>
            <a href="/">
              <img
                src="/img/Footer/android-logo.png"
                alt=""
                className="footer-top-app"
              />
            </a>
          </Grid>
          <Grid item xs={6}>
            <p className="footer-top-title">SOCIAL</p>
            <a href="/">
              <img
                src="/img/Footer/facebook-logo.png"
                alt=""
                className="footer-top-social"
              />
            </a>
            <a href="/">
              <img
                src="/img/Footer/zalo-logo.png"
                alt=""
                className="footer-top-social"
              />
            </a>
          </Grid>
        </Grid>

        <Grid item xs={2} className="footer-bottom-item">
          <img
            src="/img/Footer/zion.jpg"
            alt=""
            className="footer-bottom-img"
          />
        </Grid>
        <Grid item xs={8} className="footer-bottom-item">
          <div>
            <span className="footer-bottom-title">
              TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
            </span>

            <span>
              Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ
              Chí Minh, Việt Nam.
            </span>

            <span>Giấy chứng nhận đăng ký kinh doanh số: 0101659783,</span>

            <span>
              đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế
              hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
            </span>
            <span>
              Số Điện Thoại (Hotline): 1900545436.
              <br />
              Email:
              <a href="mailto:support@tix.vn" style={{ color: "#FB4226" }}>
                {" "}
                support@tix.vn
              </a>
            </span>
          </div>
        </Grid>
        <Grid item xs={2} className="footer-bottom-item">
          <img
            src="/img/Footer/bo-cong-thuong.png"
            alt=""
            className="footer-bottom-img"
          />
        </Grid>
      </Grid>
    </div>
  );
}
