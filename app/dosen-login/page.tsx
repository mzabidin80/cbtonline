const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    // .trim() digunakan untuk menghapus spasi kosong di awal/akhir input secara otomatis
    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    try {
      // 1. Ambil data dari tabel user_dosen
      const { data, error } = await supabase
        .from('user_dosen')
        .select('*')
        .eq('username', cleanUsername);

      // Cek apakah ada kendala jaringan atau token API salah
      if (error) {
        setErrorMsg(`Koneksi database gagal: ${error.message}`);
        setLoading(false);
        return;
      }

      // Cek apakah array data kosong
      if (!data || data.length === 0) {
        setErrorMsg(`Username "${cleanUsername}" tidak terdaftar di sistem!`);
        setLoading(false);
        return;
      }

      const user = data;

      // 2. Validasi kecocokan password text biasa
      if (user.password !== cleanPassword) {
        setErrorMsg('Sandi akses yang Anda masukkan salah!');
        setLoading(false);
        return;
      }

      // 3. Simpan session sederhana ke browser lokal
      localStorage.setItem('user_role', user.hak_akses || 'DOSEN');
      localStorage.setItem('user_nama', user.nama_lengkap);

      alert(`Selamat Datang, ${user.nama_lengkap}!`);
      
      // Mengarahkan dosen ke dashboard utama
      router.push('/dosen');
    } catch (err: any) {
      setErrorMsg('Terjadi gangguan sistem otentikasi internal.');
      setLoading(false);
    }
  };