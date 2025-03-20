package com.volts.multiplatform

import platform.UIKit.UIDevice
import kotlin.math.roundToInt

actual class BatteryManager {
    actual fun getBatteryLevel(): Int {
        UIDevice.currentDevice.batteryMonitoringEnabled=true
        val level = UIDevice.currentDevice.batteryLevel

       return (level*100).roundToInt()
    }
}