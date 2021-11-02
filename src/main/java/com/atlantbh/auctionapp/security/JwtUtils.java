package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.model.Person;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {
    @Value("${app.jwtSecret}")
    private static String jwtSecret;
    @Value("${app.jwtExpirationMs}")
    private static long jwtExpirationMs;

    public static String generateJwtToken(Person person) {
        long timestamp = System.currentTimeMillis();
        return Jwts.builder()
                .claim("id", person.getId())
                .setSubject(person.getEmail())
                .setIssuedAt(new Date(timestamp))
                .setExpiration(new Date(timestamp + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
