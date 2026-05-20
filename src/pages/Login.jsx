import { Link } from 'react-router-dom';

function Login() {
  return (
    <div style={{ 
      display: "flex",           // Flexbox to align content
      flexDirection: "column",    // Stack elements vertically
      alignItems: "center",       // Center horizontally
      justifyContent: "center",    // Center vertically
      padding: "20px", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #2d004d 100%)", 
      color: "white", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"
    }}>
      
      {/* The Login Card */}
      <div style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.05)", 
        padding: "40px", 
        borderRadius: "15px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        width: "100%",
        maxWidth: "400px" // Keeps the card from getting too wide
      }}>
        
         <h1 style={{ color: "#bb86fc", marginBottom: "20px" }}>🔐 تسجيل الدخول</h1>
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            type="email" 
            placeholder="البريد الإلكتروني" 
            style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #444', 
              backgroundColor: '#1a1a1a', 
              color: 'white',
              outline: 'none'
            }} 
          />
          
          <input 
            type="password" 
            placeholder="كلمة المرور" 
            style={{ 
              padding: '12px', 
              borderRadius: '5px', 
              border: '1px solid #444', 
              backgroundColor: '#1a1a1a', 
              color: 'white',
              outline: 'none'
            }} 
          />
          
          <button style={{ 
            padding: '12px', 
            cursor: 'pointer', 
            backgroundColor: '#bb86fc', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold',
            marginTop: '10px',
            color: '#000'
          }}>
            دخول
          </button>
        </form>
        
        <p style={{ marginTop: '20px' }}>
          ليس لديك حساب؟ <Link to="/register" style={{ color: '#bb86fc', textDecoration: 'none' }}>سجل الآن</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;