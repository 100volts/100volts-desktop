package com.volts.multiplatform

import androidx.compose.runtime.remember
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "volts-multiplatform",
    ) {
        App(batteryManager = remember{BatteryManager()})
    }
}