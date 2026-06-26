try {
      // Mengambil data menggunakan query select dasar
      const { data, error } = await supabase
        .from('user_dosen')
        .select('*')
        .eq('username', cleanUsername);

      if (error) {
        setErrorMsg(`Koneksi database gagal: ${error.message}`);
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setErrorMsg(`Username "${cleanUsername}" tidak terdaftar di sistem!`);
        setLoading(false);
        return;
      }

      // Berikan penegasan tipe data (as any) agar TypeScript tidak membacanya sebagai array
      const user = data as any;

      // Validasi password string biasa
      if (user.password !== cleanPassword) {
        setErrorMsg('Sandi akses yang Anda masukkan salah!');
        setLoading(false);
        return;
      }

      // Menyimpan data login sederhana di browser client
      localStorage.setItem('user_role', user.hak_akses || 'DOSEN');
      localStorage.setItem('user_nama', user.nama_lengkap);

      alert(`Selamat Datang, ${user.nama_lengkap}!`);
      
      // Redirect ke halaman dashboard dosen internal
      router.push('/dosen');
    } catch (err: any) {
      setErrorMsg('Terjadi gangguan sistem otentikasi internal.');
      setLoading(false);
    }