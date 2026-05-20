import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div style={{ 
      display: "flex",           // 1. Enable Flexbox
      flexDirection: "column",    // 2. Stack elements vertically
      alignItems: "center",       // 3. Center horizontally
      justifyContent: "center",    // 4. Center vertically
      padding: "20px", 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #000000 0%, #2d004d 100%)", 
      color: "white", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center"         // 5. Ensure text inside stays centered
    }}>
      
      <div style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle box background
        padding: "40px", 
        borderRadius: "15px", 
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)" 
      }}>
        <h1 style={{ color: "#bb86fc", marginBottom: "20px" }}>📝 إنشاء حساب</h1>
        
        <form style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input 
            type="text" 
            placeholder="الاسم الكامل" 
            style={{ padding: '12px', width: '280px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white' }} 
          />
          
          <input 
            type="email" 
            placeholder="البريد الإلكتروني" 
            style={{ padding: '12px', width: '280px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white' }} 
          />
          
          <input 
            type="password" 
            placeholder="كلمة المرور" 
            style={{ padding: '12px', width: '280px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#1a1a1a', color: 'white' }} 
          />
          
          <button style={{ 
            padding: '12px', 
            cursor: 'pointer', 
            backgroundColor: '#bb86fc', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold',
            marginTop: '10px'
          }}>
            تسجيل
          </button>
        </form>
        
        <p style={{ marginTop: '20px' }}>
          لديك حساب؟ <Link to="/login" style={{ color: '#bb86fc', textDecoration: 'none' }}>تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}

