package com.kharido.businessservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FullyQualifiedAnnotationBeanNameGenerator;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(nameGenerator = FullyQualifiedAnnotationBeanNameGenerator.class)
@EnableJpaRepositories(nameGenerator = FullyQualifiedAnnotationBeanNameGenerator.class)
@EnableDiscoveryClient
public class BusinessServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusinessServiceApplication.class, args);
	}

	@org.springframework.context.annotation.Bean
	public org.springframework.boot.CommandLineRunner databaseVerifier(org.springframework.jdbc.core.JdbcTemplate jdbcTemplate) {
		return args -> {
			String dbName = jdbcTemplate.queryForObject("SELECT DATABASE()", String.class);
			Integer productCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products", Integer.class);
			Integer imageCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM product_images", Integer.class);
			System.out.println("\n================================================");
			System.out.println("CONNECTED DATABASE  : " + dbName);
			System.out.println("TOTAL PRODUCTS      : " + productCount);
			System.out.println("TOTAL PRODUCT IMAGES: " + imageCount);
			System.out.println("================================================\n");
		};
	}

}

