package com.hello;

import android.Manifest
import android.content.pm.PackageManager
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {

    private lateinit var cameraManager: CameraManager
    private var cameraId: String? = null
    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main) // レイアウトを設定

        cameraManager = getSystemService(CAMERA_SERVICE) as CameraManager
        cameraId = cameraManager.cameraIdList.firstOrNull()

        // 送信ボタンにクリックリスナーを設定
        findViewById<android.widget.Button>(R.id.sendButton).setOnClickListener {
            val text = findViewById<android.widget.EditText>(R.id.inputText).text.toString()
            if (text.isNotEmpty()) {
                // カメラ権限を確認し、あればモールス信号を送信
                if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                    != PackageManager.PERMISSION_GRANTED
                ) {
                    ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 1)
                } else {
                    sendMorse(text.uppercase())
                }
            } 
        }
        
        // 起動時に「HELLO」を送信するテストコード（もし必要ならこちらを有効化）
        // testMorseOnStartup()
    }

    private fun testMorseOnStartup() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
            != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.CAMERA), 1)
        } else {
            sendMorse("HELLO")
        }
    }

    private fun sendMorse(message: String) {
        val morseCode = textToMorse(message)
        var delay = 0L

        for (symbol in morseCode) {
            when (symbol) {
                '.' -> { // 短点
                    handler.postDelayed({ flashOn() }, delay)
                    delay += 200 // 点灯時間
                    handler.postDelayed({ flashOff() }, delay)
                }
                '-' -> { // 長点
                    handler.postDelayed({ flashOn() }, delay)
                    delay += 600 // 点灯時間
                    handler.postDelayed({ flashOff() }, delay)
                }
                ' ' -> { // 文字間の区切り
                    delay += 800 // 消灯時間
                }
            }
            delay += 200 // 各符号間の短い消灯
        }
    }

    private fun textToMorse(text: String): String {
        val morseMap = mapOf(
            'A' to ".-", 'B' to "-...", 'C' to "-.-.", 'D' to "-..", 'E' to ".",
            'F' to "..-.", 'G' to "--.", 'H' to "....", 'I' to "..", 'J' to ".---",
            'K' to "-.-", 'L' to ".-..", 'M' to "--", 'N' to "-.", 'O' to "---",
            'P' to ".--.", 'Q' to "--.-", 'R' to ".-.", 'S' to "...", 'T' to "-",
            'U' to "..-", 'V' to "...-", 'W' to ".--", 'X' to "-..-", 'Y' to "-.--", 'Z' to "--..",
            '1' to ".----", '2' to "..---", '3' to "...--", '4' to "....-", '5' to ".....",
            '6' to "-....", '7' to "--...", '8' to "---..", '9' to "----.", '0' to "-----"
        )
        return text.mapNotNull { morseMap[it] }.joinToString(" ")
    }

    private fun flashOn() {
        try {
            cameraId?.let { cameraManager.setTorchMode(it, true) }
        } catch (e: CameraAccessException) {
            e.printStackTrace()
        }
    }

    private fun flashOff() {
        try {
            cameraId?.let { cameraManager.setTorchMode(it, false) }
        } catch (e: CameraAccessException) {
            e.printStackTrace()
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 1 && grantResults.isNotEmpty() &&
            grantResults[0] == PackageManager.PERMISSION_GRANTED
        ) {
            // 権限が許可されたら、再度ボタンが押されるのを待つか、
            // もしくは直前のテキストで送信処理を再開する
            val text = findViewById<android.widget.EditText>(R.id.inputText).text.toString()
            if (text.isNotEmpty()) {
                 sendMorse(text.uppercase())
            }
        }
    }
}
