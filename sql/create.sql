create TABLE electric_meter_data(
    id BIGINT NOT NULL  PRIMARY KEY,
    el_meter BIGINT NOT NULL  PRIMARY KEY,

    voltage_L1_N NUMERIC(4, 2) NOT NULL,
    voltage_L2_N NUMERIC(4, 2) NOT NULL,
    voltage_L3_N NUMERIC(4, 2) NOT NULL,

    current_L1 NUMERIC(5, 4) NOT NULL,
    current_L2 NUMERIC(5, 4) NOT NULL,
    current_L3 NUMERIC(5, 4) NOT NULL,

    active_power_L1 NUMERIC(7, 2) NOT NULL,
    active_power_L2 NUMERIC(7, 2) NOT NULL,
    active_power_L3 NUMERIC(7, 2) NOT NULL,

    power_factor_L1 NUMERIC(1, 6) NOT NULL,
    power_factor_L2 NUMERIC(1, 6) NOT NULL,
    power_factor_L3 NUMERIC(1, 6) NOT NULL,

    total_active_power NUMERIC(25, 2) NOT NULL,
    Total_active_energy_import_tariff_1 NUMERIC(9, 2) NOT NULL,
    Total_active_energy_import_tariff_2 NUMERIC(9, 2) NOT NULL,

    time_stamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    FOREIGN KEY (el_meter) REFERENCES electric_meter(id)
)

create TABLE electric_meter(
    id BIGINT NOT NULL  PRIMARY KEY,
    company BIGINT NOT NULL,
    el_meter_address BIGINT NOT NULL,
    el_meter_name VARCHAR(65) NOT NULL,
    time_stamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    FOREIGN KEY (company) REFERENCES company(id),
)