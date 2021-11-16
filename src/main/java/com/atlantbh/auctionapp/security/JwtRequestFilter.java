package com.atlantbh.auctionapp.security;

import com.atlantbh.auctionapp.service.PersonDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final PersonDetailsService personDetailsService;
    private final JwtUtils jwtUtils;

    public JwtRequestFilter(PersonDetailsService personDetailsService, JwtUtils jwtUtils) {
        this.personDetailsService = personDetailsService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        final String requestTokenHeader = request.getHeader("authorization");

        String email = null;
        String jwtToken = null;

        if (requestTokenHeader != null) {
            if (!requestTokenHeader.startsWith("Bearer ")) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token does not begin with Bearer String");
                return;
            }
            jwtToken = requestTokenHeader.substring(7);
            try {
                email = jwtUtils.getEmailFromToken(jwtToken);
            } catch (SignatureException | MalformedJwtException ignore) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT signature");
                return;
            } catch (ExpiredJwtException ignore) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "JWT token has expired");
                return;
            } catch (RuntimeException ignore) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unable to get JWT token");
                return;
            }
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            PersonDetails personDetails;
            try {
                personDetails = (PersonDetails) personDetailsService.loadUserByUsername(email);
                if (!personDetails.isEnabled()) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "User account is deactivated");
                    return;
                }
            } catch (Exception ignore) {
                // Wrong email address in signature
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Wrong person id");
                return;
            }
            if (jwtUtils.validateToken(jwtToken, personDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(personDetails, null, null);
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }
}
