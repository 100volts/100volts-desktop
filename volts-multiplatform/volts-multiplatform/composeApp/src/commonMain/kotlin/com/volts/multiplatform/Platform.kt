package com.volts.multiplatform

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform