/* Trang.html */
let selectedMode = null;

        // mở popup
        function handleDownload() {
            const mode = localStorage.getItem("DownloadMode");

            if (!mode) {
                document.getElementById("overlay").classList.remove("hidden");
                document.getElementById("chooseBox").classList.remove("hidden");
                document.getElementById("confirmBox").classList.add("hidden");
                return;
            }

            runDownload(mode);
        }

        // chọn option
        function selectMode(mode, element) {
            selectedMode = mode;

            document.querySelectorAll(".option").forEach(el => {
                el.classList.remove("active");
            });

            element.classList.add("active");
        }

        // xác nhận bước 1
        function confirmMode() {
            if (!selectedMode) return;

            document.getElementById("chooseBox").classList.add("hidden");
            document.getElementById("confirmBox").classList.remove("hidden");
        }

        // lưu
        function saveMode() {
            localStorage.setItem("DownloadMode", selectedMode);

            if (selectedMode === "2") {
                localStorage.setItem("CorecRaft2", "true");
            }

            document.getElementById("overlay").classList.add("hidden");

            runDownload(selectedMode);
        }

        // chọn lại
        function backChoose() {
            document.getElementById("confirmBox").classList.add("hidden");
            document.getElementById("chooseBox").classList.remove("hidden");
        }

        // chạy logic
        function runDownload(mode) {

            // ===== CƠ CHẾ 1 =====
            if (mode === "1") {
                const expire = localStorage.getItem("CorecRaft");

                if (expire && Date.now() < expire) {
                    window.open("TaiXuong.html", "_blank");
                } else {
                    window.open("https://yeumoney.com/go/fBo7m2Ii", "_blank");
                }
            }

            // ===== CƠ CHẾ 2 =====
            if (mode === "2") {
                let flag = localStorage.getItem("CorecRaft2");

                if (flag === null) {
                    localStorage.setItem("CorecRaft2", "true");
                    flag = "true";
                }

                if (flag === "true") {
                    window.open("TaiXuong.html", "_blank");
                } else {
                    window.open("https://yeumoney.com/go/fBo7m2Ii", "_blank");
                }
            }
        }

        // ===== ĐẾM NGƯỢC (CHỈ CHO CƠ CHẾ 1) =====

        function f(n) {
            return n.toString().padStart(2, "0");
        }

        function updateTime() {
            const mode = localStorage.getItem("DownloadMode");
            const text = document.getElementById("timeText");

            if (mode !== "1") {
                text.innerText = "";
                return;
            }

            const expire = localStorage.getItem("CorecRaft");

            if (!expire || Date.now() >= expire) {
                text.innerText = "Thời gian không cần vượt link còn lại là: 0";
                localStorage.removeItem("CorecRaft");
                return;
            }

            let remaining = expire - Date.now();

            let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
            let minutes = Math.floor((remaining / (1000 * 60)) % 60);
            let seconds = Math.floor((remaining / 1000) % 60);

            let display = days > 0
                ? `${f(days)}:${f(hours)}:${f(minutes)}:${f(seconds)}`
                : hours > 0
                ? `${f(hours)}:${f(minutes)}:${f(seconds)}`
                : minutes > 0
                ? `${f(minutes)}:${f(seconds)}`
                : `${f(seconds)}`;

            text.innerText = `Thời gian không cần vượt link còn lại là: ${display}`;
        }

        updateTime();
        setInterval(updateTime, 1000);

/* TaiXuong.html */
function downloadFile() {
            const mode = localStorage.getItem("DownloadMode");

            // ===== CƠ CHẾ 1 =====
            if (mode === "1") {
                const duration = 30 * 24 * 60 * 60 * 1000;
                const expireTime = Date.now() + duration;
                localStorage.setItem("CorecRaft", expireTime);
            }

            // ===== CƠ CHẾ 2 =====
            if (mode === "2") {
                localStorage.setItem("CorecRaft2", "false");
            }

            // link tải thật
            window.open("https://github.com/TrangCar/Mine/releases/download/CoreCraft/core-craft_v1.1.2.mcaddon","_blank");
        }
        function downloadFile1() {
            const mode = localStorage.getItem("DownloadMode");

            // ===== CƠ CHẾ 1 =====
            if (mode === "1") {
                const duration = 30 * 24 * 60 * 60 * 1000;
                const expireTime = Date.now() + duration;
                localStorage.setItem("CorecRaft", expireTime);
            }

            // ===== CƠ CHẾ 2 =====
            if (mode === "2") {
                localStorage.setItem("CorecRaft2", "false");
            }

            // link tải thật
            window.open("https://github.com/TrangCar/KhoModMC/releases/download/CoreCraft_VietHoa/Core.Craft.Vi.t.Hoa.mcaddon","_blank");
        }