import { Box, Flex, Grid, Image, Text, chakra } from "@chakra-ui/react"
import { useState, type MouseEvent } from "react"
import { touringArtists } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"

const ChakraLink = chakra("a")

interface LogoCrop {
  width: string
  height: string
  left: string
  top: string
}

interface TouringArtistRowProps {
  name: string
  category: string
  logoSrc?: string
  logoMaxH?: string
  logoMaxW?: string
  logoObjectFit?: "contain" | "cover"
  logoCrop?: LogoCrop
  showsHref: string
  linkLabel?: string
}

function ExternalLinkArrow({ isHovered }: { isHovered: boolean }) {
  return (
    <Box
      display="inline-flex"
      flexShrink={0}
      transform={isHovered ? "translateX(3px)" : "translateX(0)"}
      transitionProperty="transform"
      transitionDuration="200ms"
      transitionTimingFunction={rowEase}
      aria-hidden
    >
      <Image
        src={assetUrl("/icons/external-link-arrow.svg")}
        alt=""
        w={{ base: "13.828px", lg901: "11px", xl1048: "13.828px" }}
        h={{ base: "12px", lg901: "10px", xl1048: "12px" }}
      />
    </Box>
  )
}

function scalePxSize(size: string, factor: number) {
  const match = /^([\d.]+)px$/.exec(size)
  if (!match) return size
  return `${Math.round(parseFloat(match[1]) * factor)}px`
}

function TouringArtistRow({
  name,
  category,
  logoSrc,
  logoMaxH,
  logoMaxW,
  logoObjectFit = "contain",
  logoCrop,
  showsHref,
  linkLabel = "Upcoming Shows",
}: TouringArtistRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isPlaceholderLink = showsHref === "#"
  const isBookCallCta = linkLabel === "Get In Touch"
  const displayLinkLabel = isBookCallCta ? "Book a call" : linkLabel
  const mobileLogoMaxH = logoMaxH ? scalePxSize(logoMaxH, 0.75) : undefined
  const scaledMobileLogoMaxW = logoMaxW
    ? scalePxSize(logoMaxW, 0.75)
    : undefined
  const mobileLogoMaxW = scaledMobileLogoMaxW
    ? `min(${scaledMobileLogoMaxW}, 32vw)`
    : undefined
  const compactLogoMaxH = logoMaxH ? scalePxSize(logoMaxH, 0.8) : undefined
  const compactLogoMaxW = logoMaxW ? scalePxSize(logoMaxW, 0.8) : undefined

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlaceholderLink) event.preventDefault()
  }

  return (
    <Box
      borderBottom="3px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      py={{ base: "4", lg901: "3" }}
      minH={{ base: "auto", lg901: "80px", xl1048: "100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid
        templateColumns={{
          base: isBookCallCta ? "1fr" : "minmax(0, 1fr) auto",
          lg901: "minmax(0, 400px) 1fr 1fr",
          xl1048: "minmax(0, 500px) 1fr 1fr",
        }}
        alignItems="center"
        alignContent="center"
        justifyItems={{ base: isBookCallCta ? "center" : "stretch", lg901: "stretch" }}
        columnGap={{ base: "4", lg901: 0 }}
        rowGap={{ base: "2", lg901: 0 }}
        py={{ base: "2", lg901: "0" }}
        minH={{ base: "auto", lg901: "61px", xl1048: "76px" }}
      >
        <Flex
          gridColumn={{ base: "1", lg901: "auto" }}
          direction={{ base: "column", lg901: "row" }}
          align={{ base: isBookCallCta ? "center" : "flex-start", lg901: "center" }}
          justify="center"
          gap={{ base: "2", lg901: 0 }}
          minW="0"
          display={{ base: "flex", lg901: "contents" }}
        >
          <Text
            as="span"
            textStyle="touringArtistName"
            gridColumn={{ lg901: "1" }}
            justifySelf={{ base: isBookCallCta ? "center" : "stretch", lg901: "auto" }}
            textAlign={{ base: isBookCallCta ? "center" : "left", lg901: "left" }}
            w={{ lg901: "208px", xl1048: "260px" }}
            minW="0"
            wordBreak="break-word"
          >
            {name}
          </Text>

          <Flex
            gridColumn={{ lg901: "2" }}
            align="center"
            justify={{ base: "flex-start", lg901: "flex-end" }}
            minW="0"
          >
            <Text as="span" textStyle="touringCategory" whiteSpace="nowrap">
              {category}
            </Text>
          </Flex>

          <Flex
            gridColumn={{ lg901: "3" }}
            display={{ base: isBookCallCta ? "flex" : "none", lg901: "flex" }}
            align="center"
            justify={{ base: "center", lg901: "flex-end" }}
            gap="2.5"
            minW="0"
          >
            <ChakraLink
              href={showsHref}
              display="inline-flex"
              alignItems="center"
              gap="2.5"
              textDecoration="none"
              textStyle="touringShowsLink"
              color={isHovered ? "accent" : "warmMuted"}
              transitionProperty="color"
              transitionDuration="200ms"
              transitionTimingFunction={rowEase}
              onClick={handleClick}
              aria-label={
                isBookCallCta
                  ? "Book a call with KYD"
                  : isPlaceholderLink
                    ? `${name} ${displayLinkLabel.toLowerCase()} (link coming soon)`
                    : `${name} ${displayLinkLabel.toLowerCase()}`
              }
              _focusVisible={rowFocusVisible}
            >
              <Text as="span">{displayLinkLabel}</Text>
              <ExternalLinkArrow isHovered={isHovered} />
            </ChakraLink>
          </Flex>
        </Flex>

        {logoSrc && logoMaxH ? (
          <Box
            gridColumn={{ base: "2", lg901: "1" }}
            gridRow="1"
            justifySelf="end"
            alignSelf="center"
            flexShrink={0}
            display="inline-flex"
            alignItems="center"
            justifyContent="flex-start"
            position="relative"
            h={{
              base: mobileLogoMaxH,
              lg901: compactLogoMaxH,
              xl1048: logoMaxH,
            }}
            w={
              logoCrop || logoObjectFit === "cover"
                ? {
                    base: mobileLogoMaxW,
                    lg901: compactLogoMaxW,
                    xl1048: logoMaxW,
                  }
                : undefined
            }
            maxW={{
              base: mobileLogoMaxW,
              lg901: compactLogoMaxW,
              xl1048: logoMaxW,
            }}
            overflow={logoCrop || logoObjectFit === "cover" ? "hidden" : undefined}
          >
            {logoCrop ? (
              <Image
                src={logoSrc}
                alt=""
                position="absolute"
                w={logoCrop.width}
                h={logoCrop.height}
                left={logoCrop.left}
                top={logoCrop.top}
                maxW="none"
                flexShrink={0}
              />
            ) : (
              <Image
                src={logoSrc}
                alt=""
                h={{
                  base: mobileLogoMaxH,
                  lg901: compactLogoMaxH,
                  xl1048: logoMaxH,
                }}
                w={
                  logoObjectFit === "cover"
                    ? {
                        base: mobileLogoMaxW,
                        lg901: compactLogoMaxW,
                        xl1048: logoMaxW,
                      }
                    : (logoMaxW
                        ? {
                            base: mobileLogoMaxW,
                            lg901: compactLogoMaxW,
                            xl1048: logoMaxW,
                          }
                        : "auto")
                }
                maxW={{
                  base: mobileLogoMaxW,
                  lg901: compactLogoMaxW,
                  xl1048: logoMaxW,
                }}
                objectFit={logoObjectFit}
                flexShrink={0}
              />
            )}
          </Box>
        ) : null}
      </Grid>
    </Box>
  )
}

const rowEase = "cubic-bezier(0.2, 0, 0, 1)"

const rowFocusVisible = {
  outline: "2px solid",
  outlineColor: "rgba(255, 255, 255, 0.45)",
  outlineOffset: "4px",
  borderRadius: "2px",
} as const

export function TouringArtistsList() {
  return (
    <Box
      as="ul"
      listStyleType="none"
      pt="0"
      aria-label="Touring artists and groups"
    >
      {touringArtists.map((artist) => (
        <Box as="li" key={artist.name}>
          <TouringArtistRow
            name={artist.name}
            category={artist.category}
            logoSrc={"logoSrc" in artist ? artist.logoSrc : undefined}
            logoMaxH={"logoMaxH" in artist ? artist.logoMaxH : undefined}
            logoMaxW={"logoMaxW" in artist ? artist.logoMaxW : undefined}
            logoObjectFit={
              "logoObjectFit" in artist ? artist.logoObjectFit : undefined
            }
            logoCrop={"logoCrop" in artist ? artist.logoCrop : undefined}
            showsHref={artist.showsHref}
            linkLabel={"linkLabel" in artist ? artist.linkLabel : undefined}
          />
        </Box>
      ))}
    </Box>
  )
}
