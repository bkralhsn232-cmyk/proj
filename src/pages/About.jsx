import { Link } from 'react-router-dom'; // Don't forget this import!

export default function About() {
  const linkStyle = {
    color: "#bb86fc",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s",
    padding: "5px 10px",
    borderRadius: "5px"
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "20px", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #2d004d 100%)", 
      color: "white", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"
    }}>
      
      <div style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.05)", 
        padding: "50px", 
        borderRadius: "15px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        width: "100%",
        maxWidth: "600px",
        lineHeight: "1.6"
      }}>
        <h1 style={{ color: "#bb86fc", marginBottom: "20px" }}>ℹ️ معلومات عنا</h1>
        
        <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}>
          routing مع react هذا التطبيق يستعمل نظام 
        </p>
        
        <p style={{ color: "#aaa" }}>
          انقر للانتقال إلى الصفحات:
        </p>
        
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          gap: "10px", 
          marginTop: "10px"
        }}>
          {/* Clickable Links */}
          <Link to="/login" style={linkStyle}>تسجيل الدخول</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/register" style={linkStyle}>تسجيل</Link>
          <span style={{ color: "#444" }}>|</span>
          <Link to="/mainpage" style={linkStyle}>الصفحة الرئيسية</Link>
        </div>
      </div>
    </div>
  );
}

export default About;