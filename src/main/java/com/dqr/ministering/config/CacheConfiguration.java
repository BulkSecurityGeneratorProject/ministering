package com.dqr.ministering.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.dqr.ministering.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.dqr.ministering.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Org.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Family.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Member.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Member.class.getName() + ".orgs", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Companionship.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Phone.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Phone.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Email.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Email.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.SocialMedia.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.SocialMedia.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Notes.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Notes.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Notes.class.getName() + ".companionships", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Notes.class.getName() + ".families", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Stewardship.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Stewardship.class.getName() + ".companionships", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Companion.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Companion.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Companion.class.getName() + ".companionships", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Assignment.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Assignment.class.getName() + ".stewardships", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Assignment.class.getName() + ".families", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Ministry.class.getName(), jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Ministry.class.getName() + ".members", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Ministry.class.getName() + ".companionships", jcacheConfiguration);
            cm.createCache(com.dqr.ministering.domain.Ministry.class.getName() + ".stewardships", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
